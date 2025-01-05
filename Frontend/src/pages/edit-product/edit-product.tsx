import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import "./edit-product.scss"
import LoadingScreen from "../../components/loading-screen/loading-screen"

interface Product {
  id: string
  image: string
  name: string
  gender: string
  description: string
  price: number
  discountPrice: number
}

function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Product>({
    id: "",
    image: "",
    name: "",
    gender: "",
    description: "",
    price: 0,
    discountPrice: 0,
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:5050/api/games/${id}`)
        const productData = response.data

        setProduct(productData)
        setFormData({
          id: productData.id,
          image: productData.image,
          name: productData.name,
          gender: productData.gender,
          description: productData.description,
          price: productData.price,
          discountPrice: productData.discountPrice,
        })
      } catch (error) {
        console.error("Erro ao buscar produto: ", error)
        alert("Não foi possível carregar as informações do produto.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "price" || id === "discountPrice" ? Number(value) : value,
    }))
  }

  const handleSave = async () => {
    try {
      const payload = { ...formData, id }
      await axios.put(`http://localhost:5050/api/games/${id}`, payload, {
        headers: { "access-token": localStorage.getItem("token") || "" },
      })
      alert("Produto atualizado com sucesso!")
      navigate("/home-admin")
    } catch (error) {
      console.error("Erro ao salvar o produto: ", error)
      alert("Houve um erro ao salvar o produto.")
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="product-container">
      <div className="product-card">
        <h1 className="product-title">Editar Produto</h1>
        <label htmlFor="image" className="product-label">Nova Imagem:</label>
        <input
          type="file"
          id="image"
          className="product-input"
          onChange={handleFileChange}
        />
        <label htmlFor="name" className="product-label">Nome:</label>
        <input
          type="text"
          id="name"
          className="product-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="gender" className="product-label">Gênero:</label>
        <input
          type="text"
          id="gender"
          className="product-input"
          value={formData.gender}
          onChange={handleChange}
        />
        <label htmlFor="description" className="product-label">Descrição:</label>
        <textarea
          id="description"
          className="product-textarea"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="price" className="product-label">Preço:</label>
        <input
          type="number"
          id="price"
          className="product-input"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="discountPrice" className="product-label">Preço com Desconto:</label>
        <input
          type="number"
          id="discountPrice"
          className="product-input"
          value={formData.discountPrice}
          onChange={handleChange}
        />
        <div className="product-actions">
          <button
            className="product-button-save"
            onClick={handleSave}
          >
            Salvar
          </button>
          <button
            className="product-button-cancel"
            onClick={() => navigate("/home-admin")}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProductPage

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import "./delete-product.scss"
import LoadingScreen from "../../components/loading-screen/loading-screen"

function DeleteProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/games/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.log("Erro ao buscar produto: ", error)
        alert("Não foi possível carregar as informações do produto.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/api/games/${id}`, {
        headers: { "access-token": localStorage.getItem("token") || "" },
      })
      alert("Produto excluído com sucesso!")
      navigate("/home-admin")
    } catch (error) {
      console.error("Erro ao excluir o produto: ", error)
      alert("Houve um erro ao excluir o produto.")
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="product-container">
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-img" />
        <h1 className="product-title">Excluir Produto</h1>
        <p className="product-name">{product.name}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button
            className="product-button-back"
            onClick={() => navigate("/home-admin")}
          >
            Cancelar
          </button>
          <button
            className="product-button-delete"
            onClick={() => setIsModalOpen(true)}
          >
            Excluir
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Confirmação</h2>
            <p>Tem certeza que deseja excluir o produto "{product.name}"?</p>
            <div className="modal-actions">
              <button
                className="modal-button-cancel"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="modal-button-confirm"
                onClick={handleDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteProductPage

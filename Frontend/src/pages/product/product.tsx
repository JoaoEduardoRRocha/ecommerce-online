import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import "./product.scss"
import LoadingScreen from "../../components/loading-screen/loading-screen"
import { isAuthenticated } from '../../auth/auth-helper'

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/api/games/${id}`
        )
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

  const handleCheckout = async () => {
    try {
      const authenticated = await isAuthenticated()

      if (!authenticated) {
        alert("Você precisa estar autenticado para continuar.")
        navigate("/login")
        return
      }

      const response = await axios.post(
        "http://localhost:5050/api/checkout/",
        { gameId: product.id },
        { headers: { "access-token": localStorage.getItem("token") } }
      )

      if (response.status === 200) {
        navigate("/purchased-successfully") 
      } else {
        navigate("/unauthorized")
      }
    } catch (error) {
      console.error("Erro ao iniciar o checkout: ", error)
      navigate("/cancelada")
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="product-container">
      <div className="product-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />
        <h1 className="product-title">{product.name}</h1>
        <p className="product-gender">{product.gender}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">R$ {product.price}</p>
        <div className="product-actions">
          <button
            className="product-button-back"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
          <button 
            className="product-button-buy" 
            onClick={handleCheckout}
          >
            Continuar Compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

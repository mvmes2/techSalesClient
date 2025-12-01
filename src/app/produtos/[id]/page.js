"use client"
// Exemplo de paginação dinamica com next. criar uma pasta com "[variavel do parametro na url que quer usar]"
//[id]
import { useParams } from "next/navigation";

export default function Products() {
    const params = useParams();
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h1>Produto #{params.id}</h1>
      </div>
    </main>
  );
}

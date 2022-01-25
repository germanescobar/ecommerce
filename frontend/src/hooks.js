import { useEffect, useState } from "react"

export function useMercadoPago(publicKey) {
  const [mercadopago, setMercadopago] = useState()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://sdk.mercadopago.com/js/v2"

    script.addEventListener("load", () => {
      setMercadopago(
        new window.MercadoPago(publicKey, {
          locale: "es-CO",
        })
      )
    })

    document.body.appendChild(script)

    return () => {
      let iframe = document.body.querySelector('iframe[src*="mercadolibre"]')
      if (iframe) {
        document.body.removeChild(iframe)
      }
      document.body.removeChild(script)
    }
  }, [])

  return mercadopago
}

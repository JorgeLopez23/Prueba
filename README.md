Método GET
Ejemplo de respuesta:

[
    {
        "type": "read",
        "data": {
          "id": 3
        }
      },
      {
        "ID": 3,
        "PRODUCTO": "aceite de auto",
        "PRECIO": 500,
        "CANTIDAD": 4
      }
]
Method POST
Cuerpo de la solicitud:

{
    "type": "create",
    "data": {
      "producto": "llanta",
      "precio": 500,
      "cantidad": 1
    }
  }
Ejemplo de respuesta:

{
    "message": "Producto creado con éxito"
}
Method PUT
Cuerpo de la solicitud:

{
    "type": "update",
    "data": {
      "id": 1,
      "producto": "refrigerante",
      "precio": 550,
      "cantidad": 5
    }
  }
Ejemplo de respuesta:

{
    "message": "Producto actualizado con éxito",
    "affectedRows": 1
}
Method DELETE
Cuerpo de la solicitud:

{
    "type": "delete",
    "data": {
      "id": 2
    }
  }
Ejemplo de respuesta:

{
    "message": "Producto eliminado con éxito",
    "affectedRows": 1
}
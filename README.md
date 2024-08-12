# Lambda Prueba

Este proyecto proporciona una API para realizar operaciones CRUD básicas sobre productos. La API permite leer, agregar, actualizar y eliminar usuarios en la base de datos. Los métodos disponibles son GET, POST, PUT y DELETE.

## Método GET

**Ejemplo de respuesta:**
```json
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
```
# Method POST

**Cuerpo de la solicitud:**

```json

{
    "type": "create",
    "data": {
      "producto": "llanta",
      "precio": 500,
      "cantidad": 1
    }
  }
  ```
**Ejemplo de respuesta:**
```json
{
    "message": "Producto creado con éxito"
}
```
# Method PUT

**Cuerpo de la solicitud:**

```json

{
    "type": "update",
    "data": {
      "id": 1,
      "producto": "refrigerante",
      "precio": 550,
      "cantidad": 5
    }
  }
  ```
**Ejemplo de respuesta:**

```json
{
    "message": "Producto actualizado con éxito",
    "affectedRows": 1
}
```
# Method DELETE

**Cuerpo de la solicitud:**

```json
{
    "type": "delete",
    "data": {
      "id": 2
    }
  }
  ```
**Ejemplo de respuesta:**

```json
{
    "message": "Producto eliminado con éxito",
    "affectedRows": 1
}
```
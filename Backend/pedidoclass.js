export class Item
{
    constructor(cantidad, idplatillo, precioplatillo)
    {
        this.cantidad = cantidad;
        this.idplatillo = idplatillo;
        this.precioplatillo = precioplatillo;
        this.total = precioplatillo * cantidad;
    }
}

export class Pedido
{
    constructor(id, mesa, prioridad, items)
    {
        this.id = id;
        this.mesa = mesa;
        this.prioridad = prioridad;
        this.items = items;
        this.enproceso = false;
        this.terminado = false;
        
        let total = 0;
        items.forEach(element => {
            total += element.total;
        });
        this.total = total;
    }
}

using dotnet_service.Models;
using dotnet_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_service.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }


        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderService.GetOrderAsync();
            return Ok(orders);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetSingleOrders(Guid id)
        {
            var result = await _orderService.GetOrderById(id);
            return Ok(result);
            // var orders = 
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateOrders([FromBody] Order order)

        {
            var createdOrder = await _orderService.CreateOrder(order);
            return Ok(createdOrder);
        }



        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateOrders([FromBody] Order order, Guid id)
        {

            var updatedOrder = await _orderService.UpdateOrder(id, order);
            if (updatedOrder == null)
                return NotFound();

            return Ok(updatedOrder);
        }



        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteOrders(Guid id)
        {
            var success = await _orderService.DeleteOrderAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }


    }
}
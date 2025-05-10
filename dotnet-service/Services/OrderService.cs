using dotnet_service.data;
using dotnet_service.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_service.Services
{
    public class OrderService
    {
        private readonly AppDbContext _appDbContext;

        public OrderService(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task<List<Order>> GetOrderAsync()
        {
            var orders = await _appDbContext.Orders.ToListAsync();
            return orders;
        }

        public async Task<Order?> GetOrderById(Guid orderId)
        {
            var result = await _appDbContext.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            return result;

        }



        public async Task<Order?> UpdateOrder(Guid orderId, Order orderData)

        {
            var existingOrder = await _appDbContext.Orders.FindAsync(orderId);
            if (existingOrder == null)
                return null;

            await _appDbContext.SaveChangesAsync();
            return existingOrder;

        }




        public async Task<Order?> CreateOrder(Order orderData)

        {
            orderData.Id = Guid.NewGuid(); // Generate a unique ID for the new order
            orderData.PlacedAt = DateTime.UtcNow;
            // orderData.UpdatedAt = DateTime.UtcNow;
            await _appDbContext.Orders.AddAsync(orderData);
            var result = await _appDbContext.SaveChangesAsync();
            return orderData;

        }

        public async Task<bool> DeleteOrderAsync(Guid id)
        {
            var order = await _appDbContext.Orders.FindAsync(id);
            if (order == null)
                return false;

            _appDbContext.Orders.Remove(order);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

    }


}
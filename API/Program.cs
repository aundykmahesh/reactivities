using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
           var host =   CreateHostBuilder(args).Build();

           using var scope = host.Services.CreateScope();

           var services = scope.ServiceProvider;

           try
           {
               var context = services.GetRequiredService<DataContext>();

                await context.Database.MigrateAsync();
                //add test data
                await Seed.SeedData(context);
           }
           catch (System.Exception ex)
           {
               var logger = services.GetRequiredService<ILogger<Program>>();
               logger.LogError(ex,"Exception occured during migration");
               throw;
           }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

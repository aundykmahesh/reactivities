using Application.Activites;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class ApplicationSerivicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config)
            {
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                });

                services.AddDbContext<Persistence.DataContext>(opt => {
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });

                services.AddCors(options => {
                    options.AddPolicy("CorsPolicy", corsoptions => {
                        corsoptions.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                        });
                }
                );

                services.AddMediatR(typeof(List.Handler).Assembly);
                services.AddAutoMapper(typeof(MappingProfile).Assembly);

                return services;
            }
    }
}
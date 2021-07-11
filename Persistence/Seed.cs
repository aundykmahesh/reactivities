using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext dbcontext, UserManager<AppUser> userManager)
        {
           
           if(!userManager.Users.Any()){
               var users = new List<AppUser>{
                   new AppUser{DisplayName="testuser1", UserName="testuser1", Email="testuser1@test.com"},
                   new AppUser{DisplayName="testuser2", UserName="testuser2", Email="testuser2@test.com"},
                   new AppUser{DisplayName="testuser3", UserName="testuser3", Email="testuser3@test.com"},
                   new AppUser{DisplayName="testuser4", UserName="testuser4", Email="testuser4@test.com"},
                   new AppUser{DisplayName="testuser5", UserName="testuser5", Email="testuser5@test.com"},
                   new AppUser{DisplayName="testuser6", UserName="testuser6", Email="testuser6@test.com"},
                   new AppUser{DisplayName="testuser7", UserName="testuser7", Email="testuser7@test.com"},
                   new AppUser{DisplayName="testuser8", UserName="testuser8", Email="testuser8@test.com"}
               };

               foreach (var user in users)
               {
                   await userManager.CreateAsync(user,"Pa$$w0rd");
               }
           }
           
           
           
            if(dbcontext.Activities.Any()) return;

            var activities = new List<Activity>
            {
                 new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                }
            };
            await dbcontext.Activities.AddRangeAsync(activities);
            await dbcontext.SaveChangesAsync();
        }
    }
}
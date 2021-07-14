using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activites;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseController
    {


        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return HandleResult<List<Activity>>(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result= await Mediator.Send(new Details.Query{ID=id});

            return HandleResult<Activity>(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){
            
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditActivity(Guid Id, Activity activity){
            activity.Id = Id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid Id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id=Id}));
        }
    }
}
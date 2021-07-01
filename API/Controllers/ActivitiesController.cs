using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activites;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {


        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{ID=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){
            await Mediator.Send(new Create.Command{Activity = activity});
            return Ok();
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditActivity(Guid Id, Activity activity){
            activity.Id = Id;
            return Ok (await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid Id){
            return Ok(await Mediator.Send(new Delete.Command{Id=Id}));
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace Application.Activites
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity =  await _dataContext.Activities.FindAsync(request.Id);

                //if(activity==null) return null;

                 _dataContext.Activities.Remove(activity);
                var result =  await _dataContext.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Delete Failed");

                return Result<Unit>.Success(Unit.Value);              
            }
        }
    }
}
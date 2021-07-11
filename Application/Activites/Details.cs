using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activites
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid ID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity= await _dataContext.Activities.FindAsync(request.ID);
                
                return Result<Activity>.Success(activity);
            }
        }
    }
}
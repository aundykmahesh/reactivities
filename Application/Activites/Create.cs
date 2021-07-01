using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activites
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContect;
            public Handler(DataContext dataContect)
            {
                _dataContect = dataContect;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _dataContect.Activities.Add(request.Activity);
                await _dataContect.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
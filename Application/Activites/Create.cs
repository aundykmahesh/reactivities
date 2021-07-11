using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activites
{
    public class Create
    {
        //Mediatr unit means not returning anything
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContect;
            public Handler(DataContext dataContect)
            {
                _dataContect = dataContect;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _dataContect.Activities.Add(request.Activity);
                var result = await _dataContect.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create Activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
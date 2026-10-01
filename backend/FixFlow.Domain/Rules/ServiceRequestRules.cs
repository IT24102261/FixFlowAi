using FixFlow.Domain.Enums;

namespace FixFlow.Domain.Rules;

public static class ServiceRequestRules
{
    public static bool RequiresApproval(ServiceRequestStatus status) =>
        status is ServiceRequestStatus.AwaitingCustomerApproval or ServiceRequestStatus.Booked;
<<<<<<< HEAD
}
=======

    public static bool AllowsQuotations(ServiceRequestStatus status) =>
        status is ServiceRequestStatus.Matching
            or ServiceRequestStatus.CollectingQuotes
            or ServiceRequestStatus.AwaitingCustomerApproval;
}
>>>>>>> aced347 (after final corrections from all members)

namespace FixFlow.Domain.Enums;

public enum UserRole { Customer, Technician, Administrator }

public enum TechnicianApplicationStatus
{
    Draft,
    Submitted,
    MoreInformationRequired,
    Approved,
    Rejected,
    ReverificationRequired,
    Suspended
}

public enum RequestStatus
{
    Draft,
    Submitted,
    Analyzing,
    ClarificationRequired,
    Matching,
    CollectingQuotes,
    AwaitingCustomerApproval,
    Booked,
    Completed,
    Cancelled,
    Failed
}

public enum QuotationStatus { Draft, Submitted, Valid, Selected, Expired, Withdrawn, Rejected }

public enum BookingStatus
{
    PendingValidation,
    Confirmed,
    Accepted,
    EnRoute,
    InProgress,
    WorkCompleted,
    CustomerConfirmed,
    Closed,
    Disputed,
    Cancelled
}

public enum AiWorkflowStatus
{
    Created,
    Planning,
    Matching,
    QuoteCollection,
    Recommending,
    WaitingForCustomerApproval,
    Validating,
    Completed,
    Failed,
    Cancelled
}

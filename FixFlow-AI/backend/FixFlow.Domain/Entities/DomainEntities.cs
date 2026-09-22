using FixFlow.Domain.Enums;

namespace FixFlow.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Customer;
    public ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();
    public TechnicianProfile? TechnicianProfile { get; set; }
}

public class TechnicianProfile : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public string ServiceArea { get; set; } = string.Empty;
    public bool IsAvailable { get; set; }
    public ICollection<TechnicianCategoryApplication> CategoryApplications { get; set; } = new List<TechnicianCategoryApplication>();
    public ICollection<Quotation> Quotations { get; set; } = new List<Quotation>();
}

public class ServiceCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public ICollection<CategoryVerificationRequirement> VerificationRequirements { get; set; } = new List<CategoryVerificationRequirement>();
}

public class CategoryVerificationRequirement : BaseEntity
{
    public Guid ServiceCategoryId { get; set; }
    public ServiceCategory? ServiceCategory { get; set; }
    public string RequirementName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsMandatory { get; set; } = true;
}

public class TechnicianCategoryApplication : BaseEntity
{
    public Guid TechnicianProfileId { get; set; }
    public TechnicianProfile? TechnicianProfile { get; set; }
    public Guid ServiceCategoryId { get; set; }
    public ServiceCategory? ServiceCategory { get; set; }
    public TechnicianApplicationStatus Status { get; set; } = TechnicianApplicationStatus.Draft;
    public string? AdminNotes { get; set; }
    public ICollection<TechnicianDocument> Documents { get; set; } = new List<TechnicianDocument>();
    public ICollection<VerificationCheck> VerificationChecks { get; set; } = new List<VerificationCheck>();
}

public class TechnicianDocument : BaseEntity
{
    public Guid TechnicianCategoryApplicationId { get; set; }
    public TechnicianCategoryApplication? TechnicianCategoryApplication { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string StoragePath { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public bool IsPrivate { get; set; } = true;
}

public class VerificationCheck : BaseEntity
{
    public Guid TechnicianCategoryApplicationId { get; set; }
    public TechnicianCategoryApplication? TechnicianCategoryApplication { get; set; }
    public string CheckName { get; set; } = string.Empty;
    public bool Passed { get; set; }
    public string? Notes { get; set; }
}

public class ServiceRequest : BaseEntity
{
    public Guid CustomerId { get; set; }
    public User? Customer { get; set; }
    public Guid? ServiceCategoryId { get; set; }
    public ServiceCategory? ServiceCategory { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ProblemDescription { get; set; } = string.Empty;
    public string ServiceArea { get; set; } = string.Empty;
    public DateTimeOffset? PreferredStartAt { get; set; }
    public RequestStatus Status { get; set; } = RequestStatus.Draft;
    public ICollection<RequestMedia> Media { get; set; } = new List<RequestMedia>();
    public ICollection<RequestInvitation> Invitations { get; set; } = new List<RequestInvitation>();
    public ICollection<Quotation> Quotations { get; set; } = new List<Quotation>();
    public ICollection<AiWorkflow> AiWorkflows { get; set; } = new List<AiWorkflow>();
}

public class RequestMedia : BaseEntity
{
    public Guid ServiceRequestId { get; set; }
    public ServiceRequest? ServiceRequest { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string StoragePath { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public string? MetadataJson { get; set; }
}

public class RequestInvitation : BaseEntity
{
    public Guid ServiceRequestId { get; set; }
    public ServiceRequest? ServiceRequest { get; set; }
    public Guid TechnicianProfileId { get; set; }
    public TechnicianProfile? TechnicianProfile { get; set; }
    public string Status { get; set; } = "Pending";
    public string? EligibilityReason { get; set; }
}

public class Quotation : BaseEntity
{
    public Guid ServiceRequestId { get; set; }
    public ServiceRequest? ServiceRequest { get; set; }
    public Guid TechnicianProfileId { get; set; }
    public TechnicianProfile? TechnicianProfile { get; set; }
    public decimal LabourCost { get; set; }
    public decimal MaterialCost { get; set; }
    public decimal TravelCost { get; set; }
    public decimal TotalEstimate { get; set; }
    public DateTimeOffset? ArrivalWindowStart { get; set; }
    public TimeSpan? EstimatedDuration { get; set; }
    public DateTimeOffset? ExpiresAt { get; set; }
    public QuotationStatus Status { get; set; } = QuotationStatus.Draft;
    public Booking? Booking { get; set; }
}

public class Booking : BaseEntity
{
    public Guid QuotationId { get; set; }
    public Quotation? Quotation { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.PendingValidation;
    public DateTimeOffset ScheduledAt { get; set; }
    public ICollection<BookingStatusHistory> StatusHistory { get; set; } = new List<BookingStatusHistory>();
    public ICollection<ScopeChangeRequest> ScopeChangeRequests { get; set; } = new List<ScopeChangeRequest>();
    public Review? Review { get; set; }
}

public class BookingStatusHistory : BaseEntity
{
    public Guid BookingId { get; set; }
    public Booking? Booking { get; set; }
    public BookingStatus Status { get; set; }
    public string? Notes { get; set; }
}

public class ScopeChangeRequest : BaseEntity
{
    public Guid BookingId { get; set; }
    public Booking? Booking { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal AdditionalCost { get; set; }
    public bool CustomerApproved { get; set; }
}

public class Review : BaseEntity
{
    public Guid BookingId { get; set; }
    public Booking? Booking { get; set; }
    public Guid CustomerId { get; set; }
    public User? Customer { get; set; }
    public int Rating { get; set; }
    public string Comments { get; set; } = string.Empty;
    public bool IsModerated { get; set; }
}

public class AiWorkflow : BaseEntity
{
    public Guid ServiceRequestId { get; set; }
    public ServiceRequest? ServiceRequest { get; set; }
    public AiWorkflowStatus Status { get; set; } = AiWorkflowStatus.Created;
    public string AgentName { get; set; } = string.Empty;
    public string? ExecutionSummary { get; set; }
    public ICollection<AiWorkflowStep> Steps { get; set; } = new List<AiWorkflowStep>();
}

public class AiWorkflowStep : BaseEntity
{
    public Guid AiWorkflowId { get; set; }
    public AiWorkflow? AiWorkflow { get; set; }
    public string StepName { get; set; } = string.Empty;
    public int Order { get; set; }
    public string? StructuredOutputJson { get; set; }
    public string? Summary { get; set; }
}

public class Approval : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public Guid TargetId { get; set; }
    public string TargetType { get; set; } = string.Empty;
    public string ApprovalType { get; set; } = string.Empty;
    public DateTimeOffset ApprovedAt { get; set; } = DateTimeOffset.UtcNow;
}

public class AuditLog : BaseEntity
{
    public Guid? UserId { get; set; }
    public User? User { get; set; }
    public string Action { get; set; } = string.Empty;
    public string EntityName { get; set; } = string.Empty;
    public Guid? EntityId { get; set; }
    public string? Summary { get; set; }
}

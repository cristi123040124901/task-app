graph TB
subgraph Parent Component
ParentComp[CustomerDashboard]
end

    subgraph Child Components
        List[CustomerList<br/>@Input customers<br/>@Output selected]
        Details[CustomerDetails<br/>@Input customer]
        Actions[ActionButtons<br/>@Output action]
    end

    subgraph Services
        CustomerService[CustomerService]
        NotificationService[NotificationService]
    end

    ParentComp -->|@Input| List
    ParentComp -->|@Input| Details
    ParentComp -->|@Input| Actions

    List -.->|@Output| ParentComp
    Actions -.->|@Output| ParentComp

    ParentComp <-->|Inject| CustomerService
    ParentComp <-->|Inject| NotificationService

    style ParentComp fill:#ffd93d
    style List fill:#6bcf7f
    style Details fill:#6bcf7f
    style Actions fill:#6bcf7f

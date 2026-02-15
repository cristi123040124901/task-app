graph TB
App[AppModule]
Core[CoreModule]
Shared[SharedModule]
Auth[AuthModule]
Customer[CustomerModule]
Account[AccountModule]
Transaction[TransactionModule]

    App --> Core
    App --> Shared
    App --> Auth
    App --> Customer
    App --> Account
    App --> Transaction

    Customer --> Shared
    Account --> Shared
    Transaction --> Shared

    Auth --> Core
    Customer --> Core
    Account --> Core
    Transaction --> Core

    Core -.->|Singleton Services| CoreServices[AuthService, LoggingService, ErrorHandler]
    Shared -.->|Reusable| SharedComp[Pipes, Directives, Components]

    style Core fill:#ff6b6b
    style Shared fill:#4ecdc4
    style Auth fill:#ffe66d

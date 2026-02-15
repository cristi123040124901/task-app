graph LR
subgraph Presentation Layer
Smart[Smart Components]
Dumb[Dumb Components]
end

    subgraph Business Logic Layer
        Facades[Facades/Services]
        State[State Management - NgRx/Signal Store]
    end

    subgraph Data Access Layer
        API[API Services]
        HTTP[HTTP Interceptors]
        Cache[Cache Service]
    end

    subgraph External
        Backend[Backend API]
    end

    Smart --> Facades
    Facades --> Smart
    Smart --> Dumb
    Dumb -.->|Events| Smart

    Facades --> State
    State --> Facades
    Facades --> API
    API --> HTTP
    HTTP --> Cache
    HTTP --> Backend
    Backend --> HTTP

    style Smart fill:#95e1d3
    style Facades fill:#f38181
    style API fill:#aa96da

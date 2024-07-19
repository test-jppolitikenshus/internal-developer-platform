### Architecture Decision Record (ADR)

#### Title: 005 Kubernetes som IAC

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

- crossplane
- ack
- kubernetes operators
- terraform
- CDK
- pulumi

crossplane vs terraform:
Automatic syncing – The tool automatically keeps the desired and manyactual state of your resources in sync. If there's a drift from the desired state, the system can automatically apply changes to reconcile the state.
Self-healing capabilities – Kubernetes has built-in mechanisms to detect and rectify failures. If a resource managed by the tool fails or becomes unhealthy, Kubernetes can automatically attempt to heal the system by restarting containers, re-scheduling workloads, or scaling resources.
Declarative configuration - Similar to Terraform, you define your infrastructure as code in a declarative manner. However, by leveraging Kubernetes, you gain the advantage of integrating more seamlessly with Kubernetes resources and services.
Scalability - Leveraging Kubernetes means you can easily scale your resources up or down based on demand. Kubernetes' control plane automates the distribution and scheduling of workloads across a cluster, optimizing resource utilization.
Community and ecosystem - By aligning with Kubernetes, you tap into a large and active community. This comes with many plugins, tools, and extensions that can enhance and simplify managing your infrastructure.
Security features - Kubernetes offers several built-in security features, such as role-based access control (RBAC), network policies, and Secrets management. These features can be leveraged to secure the infrastructure managed by the tool.
Multi-cloud and hybrid-cloud support - Kubernetes is designed to run across various environments, including on-premises, public clouds, and hybrid clouds. This flexibility allows for consistent management of resources regardless of their location.

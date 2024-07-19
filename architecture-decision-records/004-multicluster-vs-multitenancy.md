### Architecture Decision Record (ADR)

#### Title: 004 kubernetes multicluster vs multitenancy

#### Date: 2024-07-03

---

## Status

Forslag

## Kontekst

Følgende produkter tilbyder kubernetes multi-tenancy og/eller multi-cluster management:

- Suse Rancher (multi kubernetes cloud management)
- Portainer (alternativ til Rancher)
- KubeSphere (alternativ til Rancher, multitenant & multicloud kubernetes
  management)
  - Cloudify (orchestrator of orchestrators for hybrid cloud)
  - vCluster (kubernetes multi-tenancy)
    kubernetes operators
    https://tanzu.vmware.com/content/blog/kubernetes-one-cluster-or-many
    https://aws.amazon.com/blogs/apn/calculating-saas-cost-per-tenant-a-poc-implementation-in-an-aws-kubernetes-environment/
    https://www.cncf.io/blog/2021/06/10/why-kubernetes-is-the-best-platform-for-building-multi-tenant-saas-applications/
    https://aws.amazon.com/blogs/containers/multi-tenant-design-considerations-for-amazon-eks-clusters/

# Cloud Computing — Complete Course

*A beginner-to-advanced course built from a cloud computing knowledge base covering fundamentals, deployment and service models, architecture, enabling technologies, risk, economics, workload and storage management, operations, providers, and adoption planning.*

---

## How This Course Works

Each **Part** below is a self-contained lesson block. Every Part opens with **Learning Objectives** and closes with a **Practice** section (quick questions, multiple choice, understanding questions, comparison questions, scenario questions, and exercises with full solutions). Difficult concepts are explained using a **Simple Explanation → Technical Explanation → Example → Why It Matters** progression. New terms are defined the first time they appear (a full glossary also appears in Appendix A).

---

# PART 1 — Foundations of Cloud Computing

## Learning Objectives

By the end of this part, you should be able to:

- Explain what "the cloud" and "cloud computing" mean in plain language and in technical terms.
- List and explain the five core characteristics that make a service "cloud computing."
- Describe, briefly, how cloud computing evolved historically.
- Identify the main benefits organizations get from adopting the cloud.
- Interpret basic cloud market-size and adoption trends.

## 1.1 What Is "The Cloud"?

### Simple Explanation

Imagine your files, programs, and computing power don't live inside your own laptop — they live somewhere else, on someone else's powerful computers, and you just reach them over the internet whenever you need them. That "somewhere else" is what people call "the cloud."

### Technical Explanation

The term **Cloud** refers to a network or the Internet. It represents something that exists at a remote location and can be accessed over a network — either a public network (the Internet) or a private one (a WAN, LAN, or VPN). The name comes from the cloud-shaped symbol network engineers historically drew to represent telephone networks, and later the Internet, in network diagrams — a way of saying "the rest of the network is out there, and you don't need to know its internal details."

### Example

Checking your webmail, joining a video conference, or logging into a CRM (Customer Relationship Management — software for managing customer interactions) tool are all examples of using applications that run "in the cloud" rather than on your own machine.

### Why It Matters

Understanding "the cloud" as *remote, network-accessible computing* is the foundation for everything else in this course: deployment models describe *where* that remote computing lives, and service models describe *what* is being delivered from it.

## 1.2 What Is Cloud Computing?

**Cloud Computing** means manipulating, configuring, and accessing applications, infrastructure, and data online, over the Internet — instead of on a local machine. It delivers data storage, infrastructure, and applications as a **utility**, similar to how a household pays for electricity or water: you consume what you need and pay based on usage.

Three complementary ways to think about the definition:

1. **Access as a utility** — Cloud computing lets users access applications as utilities over the Internet, and create, configure, and customize business applications online without installing anything locally. This removes platform-dependency issues (you don't need a specific operating system or device) and makes business applications mobile and collaborative.
2. **Internet-based, pay-as-you-use computing** — Cloud computing is Internet-based computing where virtual shared servers provide software, infrastructure, platforms, devices, and other resources to customers on a pay-as-you-use basis. All the information a digitized system offers is delivered as a *service*, and users don't need expertise in managing the underlying resources — they can focus on their core business instead of IT infrastructure.
3. **Rented, shared infrastructure** — Customers do not own the physical infrastructure; instead, they rent usage from a third-party provider, avoiding large upfront capital investment. Because most cloud infrastructure is built on shared resources, servers are rarely left idle, which increases efficiency, reduces cost, and speeds up application development.

### Two Basic Working Models

Two model families make cloud computing usable in practice, and the rest of this course is largely organized around them:

- **Deployment Models** — describe *where* and *how* the cloud is hosted: Public, Private, Community, Hybrid (Part 2).
- **Service Models** — describe *what* is delivered as a service: IaaS, PaaS, SaaS, and other "Anything as a Service" variants (Parts 3–4).

## 1.3 The Five Core Characteristics of Cloud Computing

A service is generally only called "cloud computing" if it exhibits these five characteristics together. Memorize this list — it is referenced constantly throughout the course.

| # | Characteristic | Plain-Language Meaning | Technical Description |
|---|---|---|---|
| 1 | **On-Demand Self-Service** | You serve yourself, like an ATM. | Users can provision computing resources (server time, storage) automatically, without needing to interact with the service provider — simply by logging into a web portal whenever needed. |
| 2 | **Broad Network Access** | Reachable from anywhere, on any device. | Because cloud computing is entirely web-based, capabilities are available over the network and can be accessed from anywhere, at any time, from a range of client devices (laptops, phones, tablets). |
| 3 | **Resource Pooling** | Many customers share the same physical "pot" of resources. | The provider's computing resources are pooled to serve multiple tenants using a **multi-tenant** model, with physical and virtual resources dynamically assigned according to demand. Multiple tenants can share a single physical instance of hardware, database, and infrastructure while remaining isolated from one another. |
| 4 | **Rapid Elasticity** | It stretches and shrinks automatically, like a rubber band. | Resources can be scaled up or down quickly and easily to match demand. Usage is monitored automatically, so capacity can expand or contract as needed — often appearing to the consumer as unlimited. |
| 5 | **Measured Service** | You only pay for what you actually use, and both sides can see the meter. | Resource usage is monitored, controlled, and reported, giving transparency to both provider and consumer, and forming the basis of pay-per-use billing. |

### Simple Explanation (Elasticity vs. Pooling — a common point of confusion)

Resource **pooling** is about *sharing* the same underlying hardware among many customers. **Elasticity** is about *how fast that shared hardware can grow or shrink* for one customer's changing needs. Pooling is the "shared kitchen"; elasticity is "how quickly the kitchen can add more stoves when a big order comes in."

### Why It Matters

These five characteristics are the checklist examiners, architects, and vendors use to decide whether something is "real" cloud computing, or just an outsourced server. A hosted server that you rent for a fixed year with manual provisioning and no self-service portal is **not** cloud computing under this definition, even if it's "in a data center somewhere."

## 1.4 A Short History

The concept of cloud computing dates back to the **1950s**, with mainframe computers accessible via thin/static clients (simple terminals with little processing power of their own, that mostly just displayed output from a central mainframe). Since then, cloud computing has evolved progressively — from static clients toward dynamic ones, and from standalone, locally-installed software toward services delivered continuously over a network. What changed between the 1950s and today was mainly the availability of cheap, fast, ubiquitous networking (the modern Internet), which finally made the "access everything remotely" model practical for the general public and for business, not just for institutions that owned mainframes.

## 1.5 Benefits of Cloud Computing

- Applications can be accessed and manipulated as utilities, over the Internet, at any time.
- No need to install specific software locally to access or manipulate a cloud application.
- Online development and deployment tools and programming runtime environments are offered through the **Platform as a Service (PaaS)** model (covered in Part 3).
- Resources are available over the network in a platform-independent way, accessible from any type of client device.
- **On-demand self-service** — resources can be used without direct interaction with the cloud provider.
- **High cost-effectiveness** — greater efficiency and utilization while requiring only an Internet connection.
- **Load balancing**, which improves reliability (spreading traffic across multiple servers so no single one is overwhelmed).
- **Reduced upfront capital expenditure** on hardware and software — consumption is billed on a utility (like a phone bill) or subscription (like a magazine) model. Contracts can typically be terminated at any time and are often covered by **Service Level Agreements (SLAs)** — contractual documents defining expected uptime, availability, performance, and support — with financial penalties, which reduces risk and helps ensure **Return on Investment (ROI)**, a measure of the profitability of an investment relative to its cost.
- **Location independence**, so long as there is Internet access.
- **Increased flexibility and market agility** — quick deployment increases the ability to re-provision resources rapidly.
- Lets an enterprise **focus on its core business** instead of IT operations.
- **Increased competitive advantage.**
- **Increased security at lower cost** compared with traditional standalone applications, due to centralization of data and provider-managed, security-focused resources.
- **Easier maintenance**, since software doesn't need to be installed on every individual user's computer.

## 1.6 Market Size and Trends

The global cloud computing market was expected to grow from **USD 371.4 billion in 2020** to **USD 832.1 billion by 2025**, a **Compound Annual Growth Rate (CAGR)** — the mean annual growth rate of a value over a period, assuming growth compounds each year — of **17.5%** over that period.

Additional observations:

- **North America and Europe** together held more than half of the global cloud computing market as of 2020.
- **SaaS** (Software as a Service) was expected to see the highest adoption over the following five years, as enterprises use it to reduce capital expenditure (CAPEX) and focus on core competencies.
- Emerging trends expected to shape the market include **serverless computing**, **containerization**, **edge computing**, and **hybrid cloud architectures**.

---

## Part 1 — Practice

### Quick Questions

1. In one sentence, what does "the cloud" refer to?
2. Name the five core characteristics of cloud computing.
3. What decade is cloud computing's conceptual origin usually traced to?

**Answers:**
1. A network or the Internet — a remote resource accessed over a network rather than hosted locally.
2. On-Demand Self-Service, Broad Network Access, Resource Pooling, Rapid Elasticity, Measured Service.
3. The 1950s (mainframes accessed via thin/static clients).

### Multiple Choice Questions

**Question 1**
Which characteristic allows cloud resources to increase or decrease according to demand?

A. Resource pooling
B. Rapid elasticity
C. Broad network access
D. Measured service

**Answer:** B. Rapid elasticity

**Question 2**
A provider tracking and reporting exactly how much CPU, storage, and bandwidth each customer consumes, in order to bill accordingly, is exhibiting which characteristic?

A. Measured service
B. On-demand self-service
C. Resource pooling
D. Broad network access

**Answer:** A. Measured service

**Question 3**
Which of the following is **not** one of the five core cloud characteristics?

A. On-demand self-service
B. Vendor lock-in
C. Resource pooling
D. Broad network access

**Answer:** B. Vendor lock-in (this is a *risk/challenge*, covered in Part 5, not a defining characteristic).

### Understanding Questions

1. **In your own words, explain why "resource pooling" and "rapid elasticity" are different, even though both involve sharing/scaling resources.**
   *Sample answer:* Resource pooling is about many customers sharing the same underlying physical infrastructure (multi-tenancy). Elasticity is about how quickly a given customer's allocation from that pool can grow or shrink in response to demand. You can have pooling without fast elasticity (e.g., manually reassigned shared servers), and elasticity is only cheap and fast *because* the underlying resources are pooled.

2. **Why does cloud computing reduce upfront capital expenditure for a business?**
   *Sample answer:* Because the business rents computing capacity instead of buying physical servers/hardware outright. Costs shift from large one-time capital purchases (CAPEX) to smaller recurring operating expenses (OPEX) billed on usage, similar to a utility bill.

### Comparison Questions

**Resource Pooling vs. Elasticity** — Compare and contrast.

*Answer:* Resource pooling describes the *architecture* (many tenants sharing one physical resource pool via multi-tenancy). Elasticity describes a *capability* enabled by that architecture (the speed and automation with which a tenant's allocation can expand or contract). Pooling is a precondition that makes cost-efficient elasticity possible; elasticity is the visible, demand-responsive behavior a customer experiences.

### Scenario-Based Questions

**Scenario:** A small company rents a dedicated physical server from a hosting company. To get more RAM, they must call the hosting company, who manually installs new memory sticks over the next three business days. Is this cloud computing?

*Answer:* No. It lacks on-demand self-service (a manual request/human process is required) and rapid elasticity (days, not minutes, to scale, and it is not automatic). Even though the server is "remote" and accessed over a network, it does not meet the definitional characteristics of cloud computing.

### Exercises

**Exercise 1 — Difficulty: Easy**
*Problem statement:* List three everyday applications you use that are examples of cloud computing, and for each, identify at least one of the five characteristics it clearly demonstrates.
*Expected task:* Produce a short table: Application | Characteristic Demonstrated | Justification.
*Solution (sample):*

| Application | Characteristic | Justification |
|---|---|---|
| Webmail (e.g., Gmail) | Broad network access | Accessible from phone, laptop, or any browser, anywhere with internet. |
| Cloud photo backup | Measured service | Storage usage is tracked, and you're often billed based on GB used. |
| Online office suite | On-demand self-service | You create a new document instantly, with no provider intervention. |

**Exercise 2 — Difficulty: Medium**
*Problem statement:* A CFO asks you to justify, in three sentences, why moving the company's e-mail system to a cloud provider would reduce capital expenditure. Write the justification.
*Expected task:* A concise, business-oriented explanation referencing rented vs. owned infrastructure.
*Solution (sample):* Moving e-mail to the cloud eliminates the need to purchase, house, and maintain physical mail servers, converting a large upfront hardware cost into a predictable monthly subscription fee. Because cloud infrastructure is shared across many customers (resource pooling), the provider achieves economies of scale that a single company running its own mail servers cannot match. The company also avoids ongoing costs like server replacement, power, cooling, and dedicated IT staff to maintain that one system.

---

# PART 2 — Cloud Deployment Models

## Learning Objectives

By the end of this part, you should be able to:

- Define Public, Private, Community, and Hybrid cloud deployment models.
- List the benefits and disadvantages of each deployment model.
- Explain the "Cloud Service Continuum" and place a given real-world service on it.
- Choose an appropriate deployment model for a given business scenario.

## 2.1 Why Deployment Models Matter

### Simple Explanation

If service models (Part 3) answer "what am I getting?", deployment models answer "where does it live, and who else is allowed to use it?" Some clouds are shared with the whole public, some are private to one company, some are shared by a specific group, and some mix several of these.

### Technical Explanation

Deployment models define the type of access to a cloud — where it is located and who can use it. There are four primary types: **Public**, **Private**, **Community**, and **Hybrid**.

## 2.2 Public Cloud

The Public Cloud allows systems and services to be easily accessible to the general public — for example, e-mail services or infrastructure from providers such as Google, Amazon, and Microsoft. Resources are dynamically provisioned on a fine-grained, self-service basis over the Internet (or a VPN) from an off-site third-party provider, billed on a pay-per-use basis. Because of its openness, public cloud may be less secure than other models.

**Benefits:**

| Benefit | Description |
|---|---|
| Cost effective | Shared among a large number of consumers, keeping costs low. |
| Reliability | Resources are drawn from many locations; if one fails, the provider can use another. |
| Flexibility | Easy to integrate with a private cloud for a flexible hybrid approach. |
| Location independence | Delivered over the Internet, so accessible from anywhere. |
| Utility-style costing | Pay-per-use; resources available whenever needed. |
| High scalability | Drawn from a large pool and can be scaled up or down on demand. |

**Disadvantages:** Low security (data hosted off-site, resources shared publicly); less customizable than a private cloud.

## 2.3 Private Cloud

The Private Cloud allows systems and services to be accessible only within a single organization, managed internally or by a third party. Private clouds run on private networks — applications or virtual machines running on a company's own hosts — and still provide the benefits of **utility computing** (a pay-per-use model offering computational resources on demand as a metered service): shared hardware costs, failure recovery, and scaling based on demand.

**Benefits:**

| Benefit | Description |
|---|---|
| Higher security and privacy | Not available to the general public; drawn from a distinct private pool. |
| More control | Greater control over resources and hardware. |
| Cost and energy efficiency | Less cost-effective than public clouds, but greater operating efficiency. |

**Disadvantages:** Restricted area (hard to deploy globally); inflexible pricing (meeting demand spikes requires buying new hardware); limited scalability (bounded by internal capacity); requires a more skilled, specialized IT team.

## 2.4 Community Cloud

The Community Cloud is accessible to a **group of organizations** that share similar requirements, letting them jointly realize cloud benefits. Infrastructure is shared across several organizations from a specific community and may be managed internally or by a third party.

**Benefits:** Cost effective (similar to private cloud but cheaper, since costs are spread across several organizations — though still pricier per-user than fully public cloud, since it's spread over fewer users); sharing between organizations; comparatively more secure than public cloud, potentially with higher privacy/compliance.

**Issues:** Since all data is housed in one location, participants must be careful about what they store, since it might be accessible to other community members; allocating responsibility for governance, security, and cost across multiple organizations is challenging.

## 2.5 Hybrid Cloud

The Hybrid Cloud mixes public and private cloud. Critical activities typically run on the private cloud; non-critical activities run on the public cloud.

**Benefits:**

| Benefit | Description |
|---|---|
| Scalability | Combines public cloud scalability with private cloud control. |
| Flexibility | Offers both secure private resources and scalable public resources. |
| Cost efficiencies | Public resources are generally cheaper, capturing savings for non-critical workloads. |
| Security | The private portion ensures higher security for sensitive workloads. |

**Disadvantages:** Networking becomes more complex; organizations must ensure public-cloud services remain compliant with internal security policy; hybrid deployments depend on internal IT infrastructure, so cross-data-center redundancy is essential.

> **Terminology note — "Hybrid" vs. "Combined" Cloud:** Some sources distinguish "Hybrid Cloud," strictly meaning the combined use of **physical hardware together with virtualized cloud server instances** to deliver one common service, from a **"combined cloud"** — two genuinely separate clouds (e.g., a public cloud and a private cloud) joined together. In everyday usage, "hybrid cloud" loosely covers any mixture of public, private, internal, or external clouds working together, and this course generally uses the everyday meaning unless stated otherwise.

## 2.6 The Cloud Service Continuum

### Simple Explanation

Instead of thinking "public OR private," picture a sliding scale from "anyone can join instantly with no guarantees" to "tightly controlled, contractually guaranteed, highly secure." Real-world services sit at different points along this line.

### Technical Explanation

| Continuum Stage | Description |
|---|---|
| **Open community clouds** | Most open; no criteria beyond signing up and creating a password (e.g., social networks, interest-based communities). Security is generally low; usually no service-level guarantees. |
| **Controlled open mode** | Commercial public clouds open to anyone, on a pay-per-use model (e.g., a SaaS vendor charging per user/month). Because commercial, they provide higher security and typically a written SLA. |
| **Contractual open** | Public cloud offerings you cannot just sign up for with a credit card — you sign a formal contract (e.g., monthly or annual). High security, privacy, governance, and a written SLA, suitable for more critical data. |
| **Public/private hybrid clouds** | A private cloud sits behind the firewall, giving the security/predictability/governance of a data center, blended with public cloud flexibility for less-sensitive or more elastic workloads. |

A private cloud within this continuum can be **owned and managed by a company** for its own employees/partners, or be a **commercial private cloud** residing in a vendor's data center but with a secure, dedicated connection into the customer's IT environment.

### Why It Matters

In practice, most organizations run a **hybrid mix** of public cloud services, a private cloud, and traditional data center resources — using each where it best fits the workload's performance, security, and cost requirements. This continuum view is more realistic than treating "public" and "private" as two rigid, mutually-exclusive boxes.

---

## Part 2 — Practice

### Quick Questions

1. Which deployment model is shared across a specific group of organizations with similar needs?
2. What is generally the biggest disadvantage of a public cloud?
3. In a hybrid cloud, which portion typically runs critical workloads?

**Answers:** 1. Community cloud. 2. Lower security (data hosted off-site, resources shared publicly). 3. The private cloud portion.

### Multiple Choice Questions

**Question 1**
A hospital consortium shares a single cloud infrastructure to comply with shared healthcare-data regulations. This is an example of:

A. Public cloud
B. Private cloud
C. Community cloud
D. Hybrid cloud

**Answer:** C. Community cloud

**Question 2**
Which disadvantage is most associated with private cloud specifically?

A. Low security
B. Limited scalability bounded by internal hardware
C. Difficulty allocating governance across organizations
D. Vendor lock-in across public providers

**Answer:** B. Limited scalability bounded by internal hardware

**Question 3**
On the Cloud Service Continuum, a SaaS vendor billing per-user-per-month with no formal contract but reasonable security belongs to which stage?

A. Open community clouds
B. Controlled open mode
C. Contractual open
D. Public/private hybrid

**Answer:** B. Controlled open mode

### Understanding Questions

1. **Explain, in your own words, why the "combined cloud" vs. "hybrid cloud" terminology distinction exists, and why most people ignore it.**
   *Sample answer:* Strictly, "hybrid" was originally meant to describe blending physical hardware with virtualized instances within one unified service, while joining two genuinely separate clouds (like public + private) was called a "combined cloud." In everyday industry usage, this precision has been lost, and "hybrid cloud" is now used loosely for almost any mixture of cloud types. Most people use the popular meaning because it's simpler and matches how vendors market these products.

2. **Why might a community cloud cost more per user than a public cloud, even though it's cheaper than a fully private cloud?**
   *Sample answer:* Because its costs are spread across a smaller pool of organizations (the community) than a public cloud's massive customer base, it captures less economy of scale than a public cloud, even though it still benefits from sharing costs across multiple organizations rather than one.

### Comparison Questions

**Public vs. Private Cloud** — Compare on security, cost, scalability, and control.

*Answer:*

| Dimension | Public Cloud | Private Cloud |
|---|---|---|
| Security | Lower (shared, off-site) | Higher (isolated, restricted access) |
| Cost | Lower (shared among many) | Higher (dedicated resources), but more energy/operating efficient internally |
| Scalability | High (large shared pool) | Limited to internal capacity |
| Control | Less control, less customizable | Full control, highly customizable |

### Scenario-Based Questions

**Scenario:** A government defense agency needs to guarantee that sensitive data never leaves agency-controlled hardware, but also wants the operational efficiencies of cloud computing (self-service, elasticity). Which deployment model fits best, and why?

*Answer:* Private cloud. It provides higher security/privacy and full control over hardware and access, while still delivering the utility-computing benefits (self-service provisioning, elastic scaling within capacity) that the agency wants, unlike a traditional non-cloud data center.

**Scenario:** A startup wants to launch quickly with minimal upfront investment, expects unpredictable traffic spikes, and is not handling highly regulated data. Which deployment model fits best?

*Answer:* Public cloud — low cost of entry, high scalability to absorb spikes, and the lower security level is an acceptable trade-off given the non-sensitive nature of the data.

### Exercises

**Exercise 1 — Difficulty: Medium**
*Problem statement:* A university consortium of five member universities wants to jointly host a shared research-data platform. Each university has agreed to follow the same data-governance policy. Recommend a deployment model and justify it using specific benefits/issues from the material.
*Expected task:* Recommendation + justification referencing specific named benefits/issues.
*Solution:* Recommend **Community Cloud**. Justification: the five universities share similar requirements (a research-data platform with agreed governance), which matches the definition of community cloud exactly. It is more cost-effective than each university building a private cloud alone, and offers a higher security/compliance level than a fully public cloud. The main issue to plan for is that since all data sits in one shared location, governance and cost allocation must be carefully negotiated up front — precisely the challenge the material identifies for community clouds.

**Exercise 2 — Difficulty: Hard**
*Problem statement:* A retail company runs its financial transaction system on a private cloud but wants to use public cloud capacity only during the holiday shopping season, when traffic quadruples. Name the deployment model and the specific technique being used, and explain why this approach avoids wasted spending.
*Expected task:* Identify deployment model plus the specific cost-avoidance mechanism.
*Solution:* This is a **Hybrid Cloud** deployment using **cloud bursting** (a technique, defined in the glossary, of using public cloud capacity to absorb unexpected or planned demand spikes beyond what the private cloud/data center can handle). It avoids wasted spending because the company only pays for the extra public capacity during the actual holiday spike, rather than purchasing and maintaining permanent private infrastructure sized for peak demand that would sit mostly idle the rest of the year.

---

# PART 3 — Service Models: IaaS, PaaS, SaaS, and Beyond

## Learning Objectives

By the end of this part, you should be able to:

- Explain the IaaS/PaaS/SaaS "stack" and how each layer builds on the one below.
- Describe the characteristics, benefits, and issues of IaaS, PaaS, and SaaS individually.
- Distinguish public vs. private variants of IaaS and PaaS.
- Explain Identity as a Service (IDaaS) and Network as a Service (NaaS) as examples of "XaaS."
- Select the appropriate service model for a given scenario.

## 3.1 The Service Model Stack

### Simple Explanation

Think of a house being built in three layers: the foundation (IaaS) gives you raw land and utilities; the frame and plumbing (PaaS) gives you a ready structure to build inside; the fully furnished apartment (SaaS) is move-in ready — you just use it.

### Technical Explanation

There are three fundamental service models, each building on the one below it — every layer inherits the security and management mechanisms of the underlying layer:

1. **Infrastructure as a Service (IaaS)** — the most basic level, providing access to fundamental resources: physical machines, virtual machines, virtual storage.
2. **Platform as a Service (PaaS)** — sits on top of IaaS, providing the runtime environment plus development and deployment tools.
3. **Software as a Service (SaaS)** — sits on top of both PaaS and IaaS, letting end users consume finished software applications as a service.

Picture this as a pyramid: infrastructure (IaaS) at the base, middleware (PaaS) in the middle, applications (SaaS) on top.

Beyond these three, many other **"Anything as a Service" (XaaS)** models exist — Network as a Service, Business as a Service, Identity as a Service, Database as a Service, Strategy as a Service, and more (Section 3.5 covers IDaaS and NaaS).

## 3.2 Infrastructure as a Service (IaaS)

IaaS delivers computing resources — virtualized operating systems, workload management software, hardware, networking, and storage — on demand, in a rental model, as an alternative to buying and installing infrastructure in a traditional data center. In addition to physical/virtual machines and virtual storage, IaaS typically offers:

- Virtual machine disk storage
- Virtual Local Area Networks (**VLANs** — logically segmented networks within physical infrastructure, isolating traffic between device groups)
- Load balancers
- IP addresses
- Software bundles

All are delivered through **server virtualization** and accessed by customers as though they own them.

### Public vs. Private IaaS

- **Public IaaS** — designed so consumers of any size can acquire services through a simple sign-up (rental) model; when resources aren't needed, the user simply de-provisions them.
- **Private IaaS** — built by an internal IT organization (or an integrator) to provide on-demand resources to internal users and, sometimes, partners.

A company typically chooses **private IaaS** over public for three main reasons: (1) it needs to control access due to **security concerns**; (2) business-critical applications require **predictable performance** while minimizing risk; (3) the company itself acts as a **service provider** to its own customers/partners. Standardizing a private IaaS environment (so ~80% of routine processes follow a predictable pattern) brings efficiency, fewer errors, and consistency — the same technique public IaaS vendors use to control their own costs.

### Characteristics of IaaS

| Characteristic | Description |
|---|---|
| Renting | Immediate access to server/storage resources without literally renting physical equipment; a private-IaaS "charge-back" model can allocate usage costs to departments. |
| Self-service provisioning | Resources obtained through a self-service portal, like an ATM, without manual IT provisioning. |
| Dynamic scaling | Resources automatically expand/contract based on workload requirements. |
| Service levels | Range from no-guarantee, on-demand consumption to formal contracts with availability guarantees (e.g., 99.999% uptime). |
| Licensing | Enabled new models: **BYOL** (Bring Your Own License — using existing software licenses in the cloud) and **PAYG** (Pay As You Go — software licensing integrated with on-demand infrastructure billing). |
| Metering | Charges based on actual use, from instance start to termination, plus storage/data-transfer/optional-service charges. |
| Pre-installed VMs | VMs with pre-installed OS (Windows, Linux, Solaris) and software. |
| Data locality | Allows storing copies of data across different locations. |

### Benefits of IaaS

- Full control over computing resources via administrative access to VMs (run VMs, save data, start web servers, install applications).
- Flexible and efficient renting of hardware (VMs, storage, bandwidth, IP addresses, monitoring, firewalls), paid for by duration of use, supporting custom OS/software.
- Portability/interoperability with legacy applications — legacy web/e-mail servers that normally run on owned hardware can also run from IaaS VMs.

### Issues with IaaS

Beyond general cloud issues shared with PaaS/SaaS (network dependence, browser-based risk):

- **Compatibility with legacy security vulnerabilities** — running legacy software exposes consumers to that software's known vulnerabilities.
- **VM sprawl** — VMs can be run, suspended, or turned off and fall out of date on security patches; automation helps but is complex.
- **Robustness of VM-level isolation** — consumers are isolated via the **hypervisor** (a software layer providing hardware-level support for splitting a physical machine into multiple VMs).
- **Data erase practices** — since consumers share common disks, the provider must ensure released resources don't leak the previous tenant's data residue.

### Example Use Cases

- A **manufacturer** uses public IaaS to provision dev/test environments for an ERP (Enterprise Resource Planning — integrated software for managing finance, HR, manufacturing, supply chain) system on demand.
- An **insurance company** contracts secure public IaaS for quarterly/year-end risk reporting, where compute usage spikes — avoiding over-investment in capacity used only sporadically.
- A **large retailer** deploys private IaaS to give its dev team on-demand testing capacity for its retail applications.

Common realized benefits: dynamic scaling flexibility, reduced need to build new infrastructure, cost savings from avoiding underutilized capital investment, and near-limitless storage/compute.

## 3.3 Platform as a Service (PaaS)

PaaS offers the runtime environment plus development and deployment tools needed to build applications — often with point-and-click tools letting even non-developers build web apps (e.g., Google App Engine, Force.com). PaaS is usually tightly integrated with the underlying IaaS layer and hides its complexity from developers, streamlining the application lifecycle.

> **Vendor lock-in risk:** An application written against a specific vendor's PaaS API (e.g., Google App Engine) is likely to work only in that environment. Vendor lock-in is considered PaaS's biggest drawback.

### Variations

- **Public PaaS** — vendor responsible for uptime/updates; environment lives in the cloud; middleware needs no local install; tightly coupled to IaaS, supporting **DevOps** (a collaborative approach uniting development and operations teams) style management end-to-end.
- **Private PaaS** — large enterprises implement their own patterns/best practices, effectively becoming a PaaS provider to internal developers.

### Types of PaaS

| Type | Description |
|---|---|
| Stand-alone development environments | Independent entity for a specific function, no dependency on specific SaaS applications. |
| Application delivery-only environments | Focused on on-demand scaling and security for *delivering* (not building) applications. |
| Open Platform as a Service | Open-source software helping a PaaS provider run applications. |
| Add-on development facilities | Customization of an existing SaaS platform. |

### Characteristics of PaaS

Browser-based development environment (create databases, edit code via API or point-and-click); built-in security, scalability, web-service interfaces; built-in workflow/approval/business-rule tools; easy integration with other applications on the same platform; web-service interfaces connecting to outside applications.

### Benefits of PaaS

Lower administrative overhead (provider's responsibility); lower TCO (**Total Cost of Ownership** — the full comprehensive cost of an asset over its lifetime, including indirect costs) — no need for expensive hardware/servers/power/storage; scalable up/down automatically; more current system software (provider maintains patches/versions); improved development lifecycle (standardized platform reduces team/tool/version friction); eliminates installation/operational burden; standardization across development and operations; ease of provisioning build/test/repository/runtime services.

PaaS has two fundamental parts — **the platform** and **the service** — and ongoing service/continual improvement differentiates PaaS vendors from each other.

### Issues with PaaS

Like SaaS, PaaS relies heavily on the browser and a reliable, secure connection: **lack of portability** between PaaS clouds (platform-specific interfaces make moving workloads hard even with standard languages); **event-based processor scheduling** (applications must respond within a given time interval, constraining resource usage); **security engineering** burden (must explicitly implement cryptography and manage exposure due to network dependence).

## 3.4 Software as a Service (SaaS)

SaaS provides a software application as a service to end users, hosted and accessed via the Internet. Typical examples: billing/invoicing systems, CRM, help-desk applications, HR solutions. Some SaaS apps aren't customizable (e.g., a basic office suite); many provide an API letting developers build custom extensions.

### Characteristics of SaaS

Available over the Internet; maintained by the vendor, not run locally; licensed on subscription/usage, billed recurringly; cost-effective (no end-user maintenance); scalable on demand; automatically upgraded/updated; uses a **shared data model** (multiple users share a single infrastructure instance without hard-coding per-user functionality); all users run the same software version.

### Benefits of SaaS

| Benefit | Description |
|---|---|
| Modest software tools | Little/no client-side install, low configuration risk, low distribution cost. |
| Efficient license use | A single license can cover multiple computers/locations; no license servers needed. |
| Centralized management & data | Data centrally managed (though possibly stored decentralized for redundancy). |
| Provider-managed platform | Backups, maintenance, security, hardware refresh, power all handled by the provider. |
| Multitenant solutions | Multiple users share one instance in virtual isolation, with customization possible. |

### Issues with SaaS

**Browser-based risks** (a compromised browser could expose SaaS data — mitigated by dedicating a browser or using a virtual desktop); **network dependence** (delivered only while network is available; reliability can't be guaranteed by either side); **lack of portability** between SaaS clouds (workflows, business logic, UI, support scripts are provider-specific).

### Open SaaS and SOA

**Open SaaS** applications use open-source languages and can run on any open-source OS/database. Benefits: no license required, low deployment cost, less vendor lock-in, more portable applications, more robust solutions. (Open SaaS relates to **Service-Oriented Architecture**, covered in Part 4.)

## 3.5 Requirements Shared by IaaS and PaaS

In practice, IaaS and PaaS blur together — many vendors bundle IaaS as part of a PaaS solution. Shared requirements: a **consistent platform** optimized for varied customer workloads; an **integrated middleware stack** for automated deployment/management of heterogeneous, dynamically adjusting workloads; a **reliable, highly secure, scalable platform**, since the whole cloud continuum rests on the provider's reliability/security track record; a **choice of deployment models** supporting the right service level, quality of service, and security for each group.

## 3.6 Other "As a Service" Models (XaaS)

### Identity as a Service (IDaaS)

**Problem it solves:** employees typically need to log in to multiple systems, causing two problems: (1) remembering many username/password combinations; (2) when an employee leaves, IT must disable *every* account they had — increasing workload and creating a security gap if any is missed.

**IDaaS** manages *identity* (the set of attributes associated with an entity that make it recognizable, unique even among similar entities) as a digital entity usable during electronic transactions. It may include directory services, federated services, registration, authentication, risk/event monitoring, SSO services, identity/profile management.

- **Single Sign-On (SSO)** — a user logs in once, and access to other systems is managed via a single authentication server. Flow: (1) user logs into the authentication server; (2) server returns a ticket; (3) user sends the ticket to the intranet server they want; (4) that server sends the ticket back to the authentication server for verification; (5) the authentication server returns the user's security credentials to the intranet server. When an employee leaves, disabling them once at the authentication server disables every connected system automatically.
- **Federated Identity Management (FIDM)** — technologies/protocols letting a user package security credentials across different security domains, commonly using **SAML** (Security Assertion Markup Language — an XML-based standard for exchanging authentication/authorization data).
- **OpenID** — lets a user log in to multiple websites with one account (supported historically by Google, Yahoo!, Flickr, MySpace, WordPress.com). Benefits: increased site conversion rates, access to richer user profile content, fewer lost-password problems, easier social-network content integration.

### Network as a Service (NaaS)

**NaaS** gives consumers direct, secure access to network infrastructure, including deploying custom routing protocols, using a virtualized network infrastructure. The NaaS provider maintains/manages network resources, reducing consumer workload. Delivered as a utility, pay-per-use, like IaaS.

**Delivery:** a consumer logs into a web portal to access an online API and customize their network route, paying for capacity used and able to turn it off anytime.

**Mobile NaaS** offers more efficient, flexible control over mobile devices via virtualization.

**Benefits of NaaS:**

| Benefit | Description |
|---|---|
| Independence | Each consumer's network can be segregated from others. |
| Bursting | Pay for high-capacity access only when needed. |
| Resilience | Reliability treatments protect critical applications. |
| Analytics | Data-protection solutions for highly sensitive applications. |
| Ease of adding new elements | New service elements integrate easily. |
| Support models | More open support models reduce operating costs. |
| Isolation | Customer traffic is logically isolated from other tenants. |

---

## Part 3 — Practice

### Quick Questions

1. Which service model sits at the base of the IaaS/PaaS/SaaS pyramid?
2. What is the single biggest drawback commonly cited for PaaS?
3. What does SSO stand for and what problem does it solve?

**Answers:** 1. IaaS. 2. Vendor lock-in. 3. Single Sign-On — lets a user log in once and access multiple systems without re-entering credentials, and lets IT disable all access at once when an employee leaves.

### Multiple Choice Questions

**Question 1**
Which service model provides the runtime environment plus development/deployment tools, without exposing the underlying infrastructure complexity?

A. IaaS
B. PaaS
C. SaaS
D. NaaS

**Answer:** B. PaaS

**Question 2**
BYOL and PAYG are licensing models most closely associated with which service model?

A. SaaS
B. PaaS
C. IaaS
D. IDaaS

**Answer:** C. IaaS

**Question 3**
A company logs an employee into one authentication server, which then grants access to several connected internal systems without additional logins. This is:

A. FIDM
B. OpenID
C. SSO
D. NaaS

**Answer:** C. SSO

**Question 4**
Which is a specific issue tied to SaaS rather than IaaS?

A. VM sprawl
B. Browser-based risk
C. Data erase practices
D. Compatibility with legacy vulnerabilities

**Answer:** B. Browser-based risk

### Understanding Questions

1. **Explain in your own words why "vendor lock-in" is considered a bigger risk for PaaS than for IaaS.**
   *Sample answer:* PaaS applications are typically written against a vendor-specific API and set of development tools/interfaces (e.g., specific file, queue, or hash-table interfaces). This tightly couples the application's code to that one platform. IaaS, by contrast, generally provides more generic virtual machines and storage that can run relatively standard operating systems and software, making the workload somewhat easier to move between providers.

2. **Why does the material describe IaaS, PaaS, and SaaS as a "stack" rather than three independent options?**
   *Sample answer:* Because each higher layer is built on top of the lower ones and inherits both their capabilities and their security responsibilities — PaaS runs on top of IaaS infrastructure, and SaaS applications run on top of both PaaS and IaaS. You can't have SaaS without some IaaS existing underneath it, even if the SaaS consumer never sees that layer directly.

### Comparison Questions

**IaaS vs. PaaS** — Compare on what is provided, who manages what, and typical user.

*Answer:*

| Dimension | IaaS | PaaS |
|---|---|---|
| What's provided | Raw compute, storage, networking, VMs | Runtime environment + dev/deployment tools |
| Who manages OS/middleware | The consumer | The provider |
| Typical user | System administrators, infrastructure teams | Application developers |
| Biggest risk | VM sprawl, legacy vulnerability exposure | Vendor lock-in |

### Scenario-Based Questions

**Scenario:** A software vendor wants to rapidly build and launch a mobile shopping app without managing servers, operating systems, or middleware, and is comfortable coding against the vendor's specific APIs to move fast. Which service model fits, and what's the main long-term risk?

*Answer:* PaaS. It provides the runtime and development/deployment tools needed to build quickly without managing infrastructure. The main long-term risk is vendor lock-in — if the app is built tightly against that vendor's PaaS APIs, migrating to a different platform later will require significant rework.

**Scenario:** A mid-size company wants every employee to log into dozens of internal tools with one username/password, and wants IT to instantly revoke *all* access the moment someone is terminated. Which XaaS model addresses this directly?

*Answer:* Identity as a Service (IDaaS), specifically via Single Sign-On (SSO) — disabling the one account at the authentication server cuts off access to every connected system at once.

### Exercises

**Exercise 1 — Difficulty: Medium**
*Problem statement:* An insurance company needs quarterly risk-reporting compute capacity that spikes several times above normal usage, only a few times a year. Recommend a specific service model and deployment model combination, and explain the cost logic.
*Expected task:* Recommend a service+deployment combination with cost reasoning.
*Solution:* Recommend **public IaaS**. The workload is infrastructure-level (raw compute for report processing), and the spiky, infrequent nature of the demand means paying for a permanent private data center sized for peak capacity would waste money most of the year. Public IaaS lets the company provision extra virtual machines only during the reporting spikes and de-provision them afterward, paying only for actual use (metered service) — matching the "insurance company" use case described in the source material.

**Exercise 2 — Difficulty: Hard**
*Problem statement:* Design a simple justification memo (3–4 sentences) recommending against building a new internal application directly on a single vendor's proprietary PaaS API, for a company that expects to possibly switch cloud vendors within 3 years for cost reasons.
*Expected task:* A short risk-based recommendation referencing vendor lock-in and possibly Open SaaS/portability concepts.
*Solution (sample):* Building directly against a single vendor's proprietary PaaS API creates significant vendor lock-in, since applications built this way typically only run correctly within that one platform's specific interfaces. Given the company's stated intention to possibly switch cloud vendors within three years for cost reasons, this risk is especially relevant, as migrating a tightly-coupled PaaS application later would likely require substantial re-engineering. Where possible, the company should favor more portable, open-standard approaches (similar in spirit to Open SaaS's use of open-source languages and platforms) to reduce the switching cost, or explicitly budget for the migration effort as a known future cost of the proprietary-PaaS decision.

---

# PART 4 — Architecture, Infrastructure, and Enabling Technologies

## Learning Objectives

By the end of this part, you should be able to:

- Describe the front end / back end split in cloud architecture.
- List the core infrastructure components of a cloud system and the role of each.
- Explain the infrastructural constraints (transparency, scalability, monitoring, security) that cloud infrastructure must satisfy.
- Explain virtualization, the hypervisor, and the differences between Type 1 and Type 2 hypervisors.
- Distinguish Full, Emulation, and Paravirtualization.
- Explain Service-Oriented Architecture (SOA), Grid Computing, and Utility Computing, and how they relate to the cloud.

## 4.1 Cloud Architecture: Front End and Back End

### Simple Explanation

Every cloud system has two sides: the side you see and click on (front end), and the massive machinery behind the scenes that you never see directly (back end) — like a restaurant's dining room versus its kitchen.

### Technical Explanation

Cloud computing architecture is made of many loosely-coupled components, broadly divided into two parts connected through a network (usually the Internet):

- **Front End** — the client-facing part: the interfaces and applications used to access the cloud platform (e.g., a web browser), which may involve a single device or an entire network.
- **Back End** — "the cloud itself": all resources needed to deliver the service — huge data storage, virtual machines, security mechanisms, deployment models, and servers.

**Key back-end facts:**

- The back end is responsible for built-in security mechanisms, traffic control, and protocols.
- The whole system is administered via a **central server**, which also monitors client demand and traffic.
- **Middleware** — software that lets networked computers communicate with one another — enables this coordination.
- Cloud systems keep a **copy of all client data** so service can be restored after a device failure — this is called **redundancy** (also: **data redundancy** in the glossary), and providers generally guarantee it as part of the service.

## 4.2 Core Infrastructure Components

| Component | Role |
|---|---|
| **Hypervisor** | Firmware or a low-level program acting as a Virtual Machine Manager, letting multiple tenants share one physical resource instance. |
| **Management software** | Helps maintain and configure the infrastructure. |
| **Deployment software** | Helps deploy and integrate applications onto the cloud. |
| **Network** | Connects cloud services over the Internet; can itself be delivered as a utility (customer-configurable routing/protocol). |
| **Server** | Handles resource sharing and services such as allocation/deallocation, monitoring, and security. |
| **Storage** | Uses a distributed file system; if one storage resource fails, data can be retrieved from another, increasing reliability. |

## 4.3 Infrastructural Constraints

For cloud infrastructure to work reliably at scale, it must satisfy:

| Constraint | Description |
|---|---|
| **Transparency** | Since virtualization is central and no single server can meet all demand alone, resources, load balancing, and applications must be transparent to one another so capacity can scale on demand. |
| **Scalability** | Scaling an *application-delivery* solution is harder than scaling the application itself — may require configuration overhead or network re-architecting. Virtual infrastructure must allow easy provisioning/de-provisioning. |
| **Intelligent monitoring** | Needed to achieve transparency and scalability through ongoing, intelligent monitoring. |
| **Security** | The underlying mega data center must be securely architected, including the **control node** (the entry point into the data center), which needs particularly strong security. |

### Why It Matters

These constraints explain *why* cloud providers invest so heavily in automation and monitoring tooling: without transparency and intelligent monitoring, elasticity (Part 1) and reliability (Part 5) simply cannot be delivered safely at scale.

## 4.4 Virtualization — The Core Enabling Technology

### Simple Explanation

Virtualization is like slicing one large cake into many smaller pieces and handing each piece to a different guest, while making each guest feel like they have their own whole cake.

### Technical Explanation

**Virtualization** is a technique that allows a single physical instance of an application or resource to be shared among multiple organizations or tenants. It works by assigning a **logical name** to a physical resource and providing a pointer to that resource whenever requested. The resulting **multitenant architecture** offers virtual isolation between tenants, so each organization can use and customize the application as though it had its own dedicated instance.

### The Virtualization Concept

Creating a virtual machine on top of existing operating system and hardware is called **hardware virtualization**. A virtual machine provides an environment logically separated from the underlying physical hardware.

- The physical machine a VM runs on is the **host machine**.
- The virtual machine itself is the **guest machine**.
- The VM is managed by software or firmware called the **hypervisor**.

### Hypervisor Types

| Type | Description | Examples |
|---|---|---|
| **Type 1** | Runs directly on the bare physical system (no host OS underneath). | LynxSecure, RTS Hypervisor, Oracle VM, Sun xVM Server, VirtualLogic VLX |
| **Type 2** | A software interface that emulates devices, running on top of a host operating system. | Containers, KVM, Microsoft Hyper-V, VMware Fusion, Virtual Server 2005 R2, Windows Virtual PC, VMware Workstation 6.0 |

### Types of Hardware Virtualization

| Type | Description |
|---|---|
| **Full Virtualization** | The underlying hardware is completely simulated; guest software requires no modification. |
| **Emulation Virtualization** | The VM simulates the hardware and becomes independent of it; the guest OS requires no modification. |
| **Paravirtualization** | Hardware is not simulated; guest software runs within its own isolated domain, *aware* it is virtualized. |

**VMware vSphere** is a well-known example of a highly developed virtualization management infrastructure, virtualizing system, storage, and networking hardware together.

### Example

A single powerful physical server can run a Type 2 hypervisor (like KVM) to host five separate guest virtual machines, each running a different operating system, each unaware of the others — this is exactly how a cloud provider fits many customers ("multitenancy") onto shared hardware.

### Why It Matters

Virtualization is the single technology that makes resource pooling and elasticity (Part 1) technically possible. Without it, "sharing one physical machine safely among many customers" would not work.

## 4.5 Service-Oriented Architecture (SOA)

**Service-Oriented Architecture** allows applications to be used as a service by other applications, regardless of vendor, product, or underlying technology. This makes it possible to exchange data between applications from different vendors without additional programming or changes to the underlying services. SOA is what makes it realistic for cloud services from different providers to interoperate at the application level (see also "Open SaaS," Part 3).

## 4.6 Grid Computing

**Grid Computing** is distributed computing in which a group of computers from multiple locations connect to achieve a common objective. These resources are **heterogeneous** (different hardware/software) and **geographically dispersed**. Grid computing works by breaking a complex task into smaller pieces and distributing them to the CPUs residing within the grid.

### Simple Explanation

Imagine solving a giant jigsaw puzzle by mailing different sections to volunteers around the world, who each solve their small piece and mail it back — grid computing splits one huge computational task across many independent machines.

## 4.7 Utility Computing

**Utility Computing** is based on a pay-per-use model, offering computational resources on demand as a metered service — similar to a traditional utility like electricity or water. Cloud computing, grid computing, and managed IT services are all built on the underlying concept of utility computing.

### Why It Matters — Tying These Technologies Together

Virtualization, SOA, Grid Computing, and Utility Computing are not "cloud computing" themselves — they are the underlying technologies that, combined, make modern cloud computing's characteristics (Part 1) achievable: virtualization enables pooling/isolation; SOA enables interoperable services; grid computing contributes the "many machines, one task" distributed-processing pattern; and utility computing supplies the pay-per-use billing philosophy that underlies measured service.

---

## Part 4 — Practice

### Quick Questions

1. What is the difference between the "host machine" and the "guest machine"?
2. Which infrastructural constraint concerns the "entry point" into the mega data center?
3. Name the four enabling technologies covered in this part.

**Answers:** 1. The host machine is the physical machine a VM runs on; the guest machine is the virtual machine itself. 2. Security (specifically the control node). 3. Virtualization, Service-Oriented Architecture, Grid Computing, Utility Computing.

### Multiple Choice Questions

**Question 1**
Which hypervisor type runs directly on bare hardware with no host operating system underneath it?

A. Type 1
B. Type 2
C. Paravirtualization
D. Full virtualization

**Answer:** A. Type 1

**Question 2**
In which virtualization type is the guest software aware that it is virtualized?

A. Full virtualization
B. Emulation virtualization
C. Paravirtualization
D. Type 1 hypervisor

**Answer:** C. Paravirtualization

**Question 3**
Which technology specifically involves breaking a complex task into smaller pieces distributed across geographically dispersed, heterogeneous computers?

A. Virtualization
B. Grid Computing
C. Utility Computing
D. SOA

**Answer:** B. Grid Computing

**Question 4**
KVM is an example of which type of hypervisor?

A. Type 1
B. Type 2
C. Neither — it is a management software
D. A grid computing tool

**Answer:** B. Type 2

### Understanding Questions

1. **Explain why virtualization is described as the technology that makes "resource pooling" and "multitenancy" possible.**
   *Sample answer:* Virtualization lets one physical resource be logically divided and shared among many tenants by giving each tenant a virtual, isolated slice (a VM) that behaves like a dedicated machine, even though it's really sharing underlying hardware. Without this isolation and abstraction layer, providers couldn't safely let multiple unrelated customers use the same physical server.

2. **Why is scaling an application-delivery solution described as harder than scaling the application itself?**
   *Sample answer:* Scaling just the application might mean running more copies of the same code, but the *delivery* solution also has to handle load balancing, network routing, monitoring, and configuration across all those copies consistently — which can require additional configuration overhead or even re-architecting network components, not just adding more application instances.

### Comparison Questions

**Type 1 vs. Type 2 Hypervisors** — Compare.

*Answer:*

| Dimension | Type 1 | Type 2 |
|---|---|---|
| Runs on | Bare physical hardware directly | On top of a host operating system |
| Performance | Generally higher (less overhead) | Generally lower (extra OS layer) |
| Typical use | Data centers, enterprise servers | Desktops, development/testing |
| Examples | Oracle VM, LynxSecure | KVM, VMware Fusion, Hyper-V |

**Grid Computing vs. Utility Computing** — Compare.

*Answer:* Grid computing is about *how work gets distributed* — splitting one task across many heterogeneous, geographically dispersed machines to solve it collectively. Utility computing is about *how resources get billed* — a pay-per-use metering model, like electricity. A grid could in principle be billed under a utility-computing model, but the two concepts describe different things: one is a computing/architecture pattern, the other is a business/pricing model.

### Scenario-Based Questions

**Scenario:** A cloud provider wants maximum performance from its hypervisor layer in its main data centers, since even small overhead costs multiply across thousands of servers. Which hypervisor type should it prefer, and why?

*Answer:* Type 1, because it runs directly on the bare hardware without a host operating system layer in between, minimizing overhead — appropriate for large-scale enterprise data center deployments, unlike Type 2, which is typically better suited to desktop/development use.

### Exercises

**Exercise 1 — Difficulty: Medium**
*Problem statement:* A biotech research consortium wants to run a single massive genome-analysis computation by splitting it across hundreds of geographically distributed university computers with different hardware. Name the enabling technology being used and briefly justify.
*Expected task:* Identify the technology and justify using the definition.
*Solution:* This is **Grid Computing** — the definition specifically covers distributed computing where a group of geographically dispersed, heterogeneous computers work together toward a common computational objective, by breaking a complex task into smaller pieces distributed across the CPUs in the grid. This matches the genome-analysis scenario precisely.

**Exercise 2 — Difficulty: Hard**
*Problem statement:* Explain, using the infrastructural constraints from Section 4.3, why a cloud provider that only adds "intelligent monitoring" but neglects "transparency" would still likely experience elasticity problems during a sudden demand spike.
*Expected task:* A short causal explanation linking the two constraints.
*Solution:* Intelligent monitoring tells the provider *that* a demand spike is happening and roughly how severe it is, but without transparency across resources, load balancing, and applications, the system has no reliable way to know *which* additional resources are available to absorb that spike or how to route the load to them automatically. Monitoring without transparency is like having a thermometer but no thermostat connected to it — you can observe the problem but cannot automatically act on it, so rapid elasticity in practice would still fail or require manual intervention.

---

# PART 5 — Risks, Challenges, Security, and Governance

## Learning Objectives

By the end of this part, you should be able to:

- Distinguish early-stage adoption risks from ongoing industry-wide challenges.
- Explain the CSA Stack Model and how responsibility shifts between provider and consumer across IaaS/PaaS/SaaS.
- Describe key data-security mechanisms and the Brokered Cloud Storage Access pattern.
- Explain what encryption does and does not protect against.
- Describe the CSA's operational risk areas and how to build a cloud governance strategy.
- Explain what an SLA is and why it matters.

## 5.1 Risks vs. Challenges — A Key Distinction

### Simple Explanation

A **risk** is something that could specifically go wrong for an early adopter of a particular cloud deployment. A **challenge** is a broader, industry-wide problem the whole cloud computing field is still working through, regardless of which specific cloud you use.

## 5.2 Adoption Risks

| Risk | Description |
|---|---|
| **Security & Privacy** | The biggest concern. Since a third party manages data/infrastructure, handing over sensitive information always carries risk; even with password-protected accounts, a breach can cost clients and business. |
| **Lock-In** | Difficult for customers to switch Cloud Service Providers (CSPs), creating dependency on one provider. |
| **Isolation Failure** | The failure of mechanisms meant to separate storage, memory, and routing between different tenants sharing infrastructure. |
| **Management Interface Compromise** | With a public cloud, customer management interfaces are accessible over the Internet, introducing more attack surface than an internally-hosted interface. |
| **Insecure or Incomplete Data Deletion** | "Deleted" data may not be fully erased — extra copies may exist elsewhere unaccounted for, or a destroyed disk may also have stored other tenants' data, complicating secure disposal. |

## 5.3 Broader Industry Challenges

| Challenge | Description |
|---|---|
| **Security & Privacy** | Remains the biggest overall challenge to adoption; mitigated (not eliminated) via encryption, dedicated security hardware, and security applications. |
| **Portability** | Applications ideally should migrate easily between providers without lock-in; not yet fully achievable, since each provider uses different standard languages/platform conventions. |
| **Interoperability** | An application on one platform should ideally incorporate services from another; technically possible via web services, but writing such interoperable services is complex. |
| **Computing Performance** | Data-intensive applications need high network bandwidth, raising cost; keeping bandwidth low to save money can degrade performance below requirements. |
| **Reliability and Availability** | Systems must be highly reliable/robust, since more businesses depend on third-party-delivered services. |

## 5.4 Security Planning

Before moving a resource to the cloud, an organization should analyze:

- **Which resources** it plans to move, and their sensitivity to risk.
- **Which cloud service model** applies (IaaS/PaaS/SaaS) — each requires the consumer to take responsibility for security at a different stack level.
- **Which cloud type** — public, private, community, or hybrid.
- **How the provider's system works** — how data is transferred, where stored, how to move data in/out.

Overall risk depends heavily on the combination of service model and cloud type chosen.

## 5.5 The CSA Stack Model — Security Boundaries

The **Cloud Security Alliance (CSA)** is an industry organization defining/promoting cloud security best practices. Its **CSA Stack Model** defines the security responsibility boundary between the cloud provider and the consumer across the IaaS/PaaS/SaaS stack.

**Key points:**

- IaaS is the most basic level; PaaS and SaaS are layered above it.
- Moving up the stack, each service inherits the capabilities — and security concerns — of the layer beneath it.
- IaaS provides infrastructure, PaaS a platform development environment, SaaS a full operating environment.
- IaaS has the *least* integrated functionality/built-in security; SaaS has the *most*.
- The model marks the boundary where provider responsibility ends and consumer responsibility begins: anything **below** the boundary is built in by the provider; anything **above** must be maintained by the consumer.
- Security needs vary depending on deployment model too (private/public/hybrid/community).

### Simple Explanation

Picture a layer cake: the lower you rent from, the more of the "security cake" you have to bake yourself. Rent just IaaS (the bottom layer) and you're responsible for almost everything above the bare infrastructure — your own OS patching, your own application security. Rent SaaS (the top, finished cake) and the provider has already baked almost the whole thing for you; you're mostly just responsible for how you use it (e.g., managing your own user accounts and data).

## 5.6 Data Security

Because all cloud data travels over the Internet, data security is a major concern. Every service model should incorporate mechanisms across four key areas:

- **Access control**
- **Auditing**
- **Authentication**
- **Authorization**

### Isolated Access to Data — Brokered Cloud Storage Access

Since cloud-stored data can in principle be accessed from anywhere, a mechanism is needed to isolate data from *direct* client access. **Brokered Cloud Storage Access** uses two intermediary services:

- A **broker** — full access to storage, no direct access to the client.
- A **proxy** — no access to storage, but access to both the client and the broker.

**Request flow:**

1. Client's data request goes to the proxy's external service interface.
2. Proxy forwards the request to the broker.
3. Broker requests the data from the cloud storage system.
4. Cloud storage system returns the data to the broker.
5. Broker returns the data to the proxy.
6. Proxy sends the data to the client.

### Simple Explanation

Neither the "front desk" (proxy) nor the "warehouse manager" (broker) alone can both talk to the customer *and* directly reach the goods — each only has half the access needed. This split-access design means that even if the front desk (proxy) is compromised, the attacker still cannot reach storage directly, because only the broker (which never talks to clients directly) can do that.

### Encryption

Encryption protects data both in transit and at rest, guarding against unauthorized *reading*. Important: encryption protects data from being read by unauthorized parties, but it does **not**, by itself, prevent *data loss* (e.g., accidental deletion, hardware failure, or data simply becoming unavailable).

## 5.7 Broader Operational Risk Areas (CSA)

Cloud environments blur the well-defined boundary between "internal" and "external." The CSA identifies these operational risk areas:

| Risk area | What it covers |
|---|---|
| **Physical security** | Security of IT equipment, network assets, telecom infrastructure. |
| **Human resource security** | Background checks, confidentiality, segregation of duties (e.g., developers shouldn't also operate the same applications). |
| **Business continuity** | Ensures the provider meets SLA obligations for ongoing operation. |
| **Disaster recovery** | Protects data and applications — e.g., does the provider maintain mirrored sites for outages? |
| **Incident handling** | More complex in multi-tenant clouds, since commingled information complicates log analysis while protecting other tenants' privacy. |
| **Application security** | Covers the software development lifecycle, authentication, authorization, identity management, monitoring, penetration testing, and risk management. |
| **Identity and access management** | Controls/maintains access to resources, applications, data, services; often requires multiple identity-verification forms beyond a traditional firewall-protected directory. |
| **Encryption and key management** | Ensures only intended recipients can decrypt data. |

### Questions to Ask a Cloud Provider

- What security policies are in place, and are they consistent with a recognized framework/standard?
- Does the provider hold relevant industry certifications?
- How does the provider meet audit standards?
- Are there documented policies/procedures, including incident escalation?
- How does the provider handle identity and access management?
- How does the provider protect data — including government-mandated data-location requirements?

## 5.8 Cloud Governance

**Governance** applies consistent policies to cloud usage — organizing principles and rules for how an organization behaves when using the cloud, and who is accountable for what. It is a **shared responsibility** between the cloud user and provider, requiring a careful, negotiated agreement on the boundary of responsibility.

A governance strategy needs two supports:

1. **Understanding compliance/risk measures** the business must follow (e.g., can data cross international borders?), enforced through technical controls, automation, and disciplined process governance — including control over cloud spending.
2. **Understanding the business's performance goals**, working with the provider to set benchmarks (uptime, access monitoring) the provider can help meet/optimize.

### Risks Worth Noting for Governance Teams

Audit and compliance (data jurisdiction, access control, audit trails); security (data integrity, confidentiality, privacy); IP protection; performance and availability (matching actual business needs); interoperability (will infrastructure keep working if a provider changes something?); contract (understanding full terms, not just headlines); billing (correct billing for exactly what's consumed).

### Making Governance Work

1. A **governing body** (ideally extending existing governance) overseeing, collaborating with the business, negotiating with providers.
2. **Governance bodies within the cloud** dealing with standardization of shared infrastructure/services.
3. **Technology** that automatically monitors provider performance.

## 5.9 Managing Service Levels and SLAs

Providers must monitor services to ensure agreed-upon service levels — measuring server, network, and virtualized-image performance individually and collectively. A standardized, automated system should track, trace, and audit performance (bandwidth, connectivity, scalability) and quickly identify root causes of failures, answering:

- Is the infrastructure performing as expected?
- Are performance problems random or regular?
- Which problems are most severe/need top priority?
- How can performance be improved?

### Defining SLAs

A **Service Level Agreement (SLA)** captures the shared understanding between a service user and provider about uptime, availability, and performance, and is a contractual agreement in a service delivery contract. SLAs are commonly written around targets such as **99.99% monthly uptime**, and may specify response-time commitments, data confidentiality, and backup/retention practices. In complex hybrid-cloud environments, tracking SLAs across every dependent cloud relationship can get complicated.

Useful visibility tools: a **dashboard** showing application/service status across your own server rooms and the cloud (incidents/problems included); an **SLA spanning your own services and your providers'**, giving a true end-to-end picture of delivered service.

## 5.10 Building a Secure, Accountable, Reliable Environment

### Assessing Current State — Key Questions

- How are access rights controlled inside/outside the firewall, and who is entitled to access what?
- Can web application vulnerabilities/risks be identified and corrected?
- Is security risk tracked over time for stakeholder reporting?
- Are server environments continuously protected from external threats?
- Can security risks be monitored/quantified in real time?
- How are IT assets monitored/measured/managed across public and private cloud?
- Are security policies applied consistently on-premises and in the cloud?
- How is data protected regardless of storage location?
- Can auditing/reporting requirements for cloud-resident data be satisfied?
- Is there a reliable change-and-configuration process for accurate configuration information?

### Security Best Practices

Manage **identity** rigorously with clear rules plus automation; build **security awareness** among staff (threats come from employees too, and complacency is an easy trap); use **external security consultants** to periodically review policy, network, and provider practices; define specific **change-management/patch-management** policies understood by both service-management staff and the provider; review **backup and disaster-recovery** systems through a security lens, since breaches can require full application recovery.

### Why It Matters

As IT extends beyond the internal data center into public/private cloud, security, governance, and reliability must be handled as **one coordinated plan** — not siloed concerns. This is the single biggest theme tying this Part together.

---

## Part 5 — Practice

### Quick Questions

1. Name the four key areas every service model's data security should cover.
2. In the CSA Stack Model, which service model has the *most* built-in security?
3. What does encryption *not* protect against?

**Answers:** 1. Access control, auditing, authentication, authorization. 2. SaaS. 3. Data loss (e.g., deletion, hardware failure) — encryption only protects against unauthorized reading.

### Multiple Choice Questions

**Question 1**
Which risk specifically refers to the difficulty of switching from one cloud provider to another?

A. Isolation failure
B. Lock-in
C. Management interface compromise
D. Insecure data deletion

**Answer:** B. Lock-in

**Question 2**
In the Brokered Cloud Storage Access pattern, which component has full access to storage but no direct access to the client?

A. The proxy
B. The broker
C. The hypervisor
D. The control node

**Answer:** B. The broker

**Question 3**
Which CSA operational risk area specifically concerns segregation of duties, such as developers not also operating the applications they build?

A. Physical security
B. Human resource security
C. Application security
D. Incident handling

**Answer:** B. Human resource security

**Question 4**
An SLA commonly specifies which of the following?

A. The programming language used by the provider
B. A monthly uptime target such as 99.99%
C. The specific hypervisor brand in use
D. The provider's marketing budget

**Answer:** B. A monthly uptime target such as 99.99%

### Understanding Questions

1. **Explain why the CSA Stack Model says IaaS has the "least" built-in security while SaaS has the "most."**
   *Sample answer:* IaaS only provides the basic infrastructure layer (servers, storage, networking), so the provider secures just that foundational layer, leaving the operating system, middleware, and application security largely to the consumer. SaaS, in contrast, is a complete, ready-to-use application, so the provider has already built in security across the operating system, platform, and application layers beneath it — the consumer mainly manages their own accounts/data usage within it.

2. **Why is "incomplete data deletion" listed as a distinct risk from general data-security risk?**
   *Sample answer:* Even with strong access controls and encryption while data is active, a separate problem exists when data is supposed to be gone: extra copies might exist elsewhere that weren't tracked, or a physically destroyed storage device might have held other tenants' data too, making secure disposal complicated. This is a risk about the *end of data's lifecycle*, not about protecting it while in active use.

### Comparison Questions

**Risk vs. Challenge (adoption risk vs. industry challenge)** — Compare using two examples from the material.

*Answer:* A risk (e.g., "Isolation Failure") is a specific technical failure mode that can occur within a *particular* cloud deployment an organization has adopted. A challenge (e.g., "Portability") is a broader, structural limitation of the cloud computing *industry as a whole* that affects virtually every adopter and is unlikely to be solved by any single organization's own precautions — it typically requires industry-wide standards to improve.

### Scenario-Based Questions

**Scenario:** A company discovers that after deleting a customer's data from their SaaS provider, the customer's data is still technically retrievable through an old backup snapshot the provider forgot to purge. Which specific risk does this illustrate, and what CSA/security concept from this part is most relevant to preventing it going forward?

*Answer:* This illustrates **Insecure or Incomplete Data Deletion**. Preventing it requires strong **encryption and key management** combined with rigorous **audit and change-management processes** (from the governance and best-practices sections) — for example, ensuring backup retention policies are documented, audited, and enforced, and that deletion procedures cover every copy of the data, not just the primary storage location.

### Exercises

**Exercise 1 — Difficulty: Medium**
*Problem statement:* A company is evaluating a new SaaS vendor. Using Section 5.6's "Questions to Ask a Cloud Provider," write four specific questions the company's security team should ask before signing a contract, and explain why each matters.
*Expected task:* Four scenario-specific questions with a one-sentence justification each.
*Solution (sample):*
1. "What security policies are in place, and are they consistent with a recognized framework?" — establishes a baseline the company can independently verify rather than taking the vendor's word for it.
2. "Does the provider hold relevant industry certifications?" — certifications are a proxy for third-party-verified security maturity.
3. "How does the provider protect data, including government-mandated data-location requirements?" — critical if the company operates under data-residency regulations (e.g., data must stay within a specific country).
4. "What are the documented incident escalation procedures?" — determines how quickly the company will be notified and how effectively a breach will be contained if one occurs.

**Exercise 2 — Difficulty: Hard**
*Problem statement:* A hybrid-cloud company has an SLA with its private data center team promising 99.99% uptime, and a separate SLA with its public cloud IaaS provider promising 99.9% uptime for a workload that spans both environments. Explain, using Section 5.9, why the company cannot simply claim "99.99% uptime" to its own end customers, and what it should do instead.
*Expected task:* Explanation plus a concrete recommendation.
*Solution:* Because the end-to-end workload depends on *both* environments working together, the company's actual achievable uptime for that hybrid workload is bounded by the weaker of the two SLAs (99.9% from the public IaaS provider), not the stronger one. Claiming 99.99% to its own customers would misrepresent the real risk. As the material recommends, the company should build a dashboard and an SLA that spans both its own services and its providers' services, giving a true end-to-end picture, and should base its customer-facing commitment on the realistic combined reliability of the whole chain — not on the best individual component's number.

---

# PART 6 — Cloud Economics and Workload Management

## Learning Objectives

By the end of this part, you should be able to:

- Explain how organizations balance public cloud, private cloud, and traditional data center use economically.
- List the direct and indirect cost categories involved in operating a data center.
- Explain the reserved-capacity pricing model.
- Define "workload" and describe the five workload types.
- Explain the special challenges of managing workloads in a hybrid cloud, and the role of APIs.

## 6.1 Developing an Economic Strategy

Determining the right mix of public cloud, private cloud, and data center services is not a simple matter of adding up costs — it requires weighing business requirements for performance, availability, and security against the **workloads** that need support.

### Traditional Data Centers Still Matter

Adopting cloud computing does not mean the traditional data center disappears. Almost all medium/large companies continue running their own data centers for systems of record — accounting, payroll, HR, industry-specific applications. Over time, data centers tend to drift away from their originally streamlined design, ending up with a mix of hardware, architectures, operating systems, applications, and tools.

The **traditional data center** tends to suit complex, transaction-intensive line-of-business applications that must confirm/track financial transactions among customers, suppliers, and partners under tight governance and compliance requirements.

**IaaS and PaaS**, by contrast, manage a *pool* of shared, configured resources independent of physical location, often in a **multi-tenant environment** — many customers sharing infrastructure while keeping data/configuration separate, enabling economies of scale.

### Finding the Value

The right balance depends on operational performance, security, economics, and flexibility.

**When IaaS tends to deliver economic value:**

- **Short-term initiatives** needing temporary extra CPU/storage where a full permanent infrastructure would be uneconomical.
- **Ongoing capacity needs** — private IaaS can make additional compute/storage available on demand as hardware reaches end-of-service-life.
- **Cloudbursting** — handling unexpected/planned high-load periods without over-investing in permanent hardware.

**Indirect value drivers for PaaS:**

- **Reducing careless mistakes** — a tested, known-good platform reduces costly configuration errors/deployment delays.
- **Lowering skill requirements** — pre-built tools/middleware reduce reliance on a small pool of specialists.
- **Maintaining speed, flexibility, agility** — a predictable, standardized infrastructure avoids friction between dev and ops.

## 6.2 The Full Cost of a Data Center

Before comparing environments, you need the full direct and indirect cost of operating your own data center:

| Cost category | Key considerations |
|---|---|
| **Server costs** | Total annual cost of ownership: hardware support plus amortized purchase cost; rises with the number of disparate workloads a server supports. |
| **Storage costs** | Management/support costs for backing storage hardware; can be very high for e-mail or complex analytics workloads. |
| **Network costs** | Moving an internally-hosted app to the cloud can reduce internal network strain but substantially increase bandwidth requirements. |
| **Backup and archive costs** | Actual savings depend on the backup strategy after migration: who performs backups, contingency planning if the cloud service is unavailable, and whether some critical data must still be backed up locally. |
| **Disaster recovery costs** | Depends on the provider's real disaster-recovery capability (e.g., mirrored sites) — may be included, an added cost, or need a secondary vendor. |
| **Data center infrastructure costs** | Electricity, floor space, cooling, building maintenance. Because of large sunk investment, moving workloads off a data center running at only ~40% utilization may not be financially justified (a private cloud can help capture value from underutilized space instead). |
| **Software maintenance costs** | Annual maintenance, complicated by bundled licenses or integration with other applications, and whether a PAYG model is used. |
| **Platform costs** | Some applications run only on specific operating environments (Windows, Linux, HP-UX, IBM z/OS, AIX), each with its own maintenance costs. |
| **Support personnel costs** | Day-to-day operations staffing; some costs shift to the provider, but internal staff still manage/monitor cloud services alongside the data center. |
| **Infrastructure software costs** | Management software used across data center applications/services; often hard to isolate for a specific hybrid migration. |

Migrating a single application to the cloud may not meaningfully affect most indirect costs — but moving *multiple* applications can produce a significant decrease.

## 6.3 The Reserved-Capacity Pricing Model

### Simple Explanation

Think of it like a gym membership that guarantees you a locker and equipment access, at a discount, in exchange for committing to a 6- or 12-month term — versus just paying full drop-in price every visit with no guarantee a locker will be free.

### Technical Explanation

**Reserved capacity** is a common cloud pricing feature: a pool of virtual-machine resources that helps guarantee availability when needed.

- The customer commits to a period of time (e.g., 6 or 12 months) and can provision/de-provision VMs within that pool during the commitment.
- A pool has one or more "units" of capacity — e.g., one unit might include **64 virtual CPUs**, **96 GB of memory**, and **9,600 GB of storage**.
- The customer pays a monthly fee for the reservation, plus a **discounted rate** for VMs actually provisioned from the pool — not locked into paying for the full pool regardless of usage.
- Without a reservation, customers can still pay as they go for VMs, but capacity is not guaranteed.

## 6.4 What Organizations Gain from Cloud Adoption

Beyond raw cost comparisons: **lasting customer relationships** (online collaboration driving innovation that outweighs implementation costs); **IT without traditional boundaries** (connecting people/information across the enterprise instead of siloing them); **improved speed and agility** (faster, more flexible delivery whether the goal is speed-to-market or responsive customer service); **transformation of IT economics** (self-service/streamlined deployment speeds new offerings to customers).

## 6.5 Cost Calculating Tools

### Assessing Workloads

Before migrating, organizations must determine which applications will transition easily and deliver the best ROI. Workloads are rarely perfectly static — most have a stable baseline with minor fluctuations and occasional peaks (seasonal, event-driven, or triggered by sudden market changes). Some vendors (e.g., IBM) provide workload-assessment tools producing a "pain versus gain" score, combining migration effort, investment, and expected benefit.

### Cost Estimator / TCO Tools

Many providers offer online calculators estimating monthly charges (inputs like number of compute instances, storage needs, data transfer, load balancing) or **Total Cost of Ownership (TCO)** calculators estimating savings versus a data center deployment over a period (e.g., five years), factoring in server utilization, facility/power/hardware costs, and downtime cost.

> These calculators are a useful planning *input*, not a sole basis for decision-making — best used to understand computing requirements (including support, training, migration costs) and to help decide between public and private fits for future needs.

## 6.6 Workload Management

A **workload** is an independent service, application, or collection of code that can be executed and managed as a distinct unit. In cloud computing, workloads are **abstracted from their physical implementation** — isolated from the specific hardware they run on — requiring a different management approach than in traditional environments.

### Types of Workloads

| Workload type | Characteristics |
|---|---|
| **Batch workload** | Runs in the background, rarely time-sensitive; processes large data volumes on a predictable schedule (daily/monthly/quarterly). |
| **Database workload** | The most common type, present in almost every data center/cloud environment; must be tuned to support dependent services; tends to be I/O-intensive. |
| **Analytic workload** | Makes sense of vast data spread across public websites, private clouds, and data warehouses (e.g., social media analytics); tends to require real-time capability. |
| **Transactional workload** | Automates business processes like billing/order processing; increasingly spans partners/suppliers via e-commerce; both compute- and storage-intensive; complex ones often best suited to a private cloud. |
| **Test/development workload** | Uses the cloud as a platform for creating/testing applications more cost-effectively, giving developers access to common tools/configurations. |

Not every workload suits the cloud — e.g., one requiring very high-performance network storage may perform poorly under an IaaS model dependent on Internet-based network speed. A cost-benefit analysis should weigh migration cost against expected benefit per workload.

### Real-World Use Cases

- **Analytics Workload:** A life-science tools maker needed cost-effective infrastructure for growing genome-research processing demand, without scaling its own IT investment/staffing. A public cloud let it run multiple virtual infrastructures in parallel across work groups, enabling genome processing as a service at a competitive per-run cost. Benefits: a custom cloud-hosted platform for genome processing; ability to scale with growing data-handling needs; ongoing access to current infrastructure without substantial hardware/software investment.
- **Batch Workload:** A large North American insurance provider needed cost-effective infrastructure for quarterly/year-end batch processing of capital reserves and risk reporting (a legal requirement), where capacity needs could quadruple during peaks. A public cloud with IaaS provided a platform to provision capacity as needed and de-provision afterward, saving the insurer **75% compared with acquiring that capacity in-house**. Benefits: scaling capacity to match actual demand over time; maintaining current infrastructure without capital costs for hardware or ongoing costs for underused software/services; not paying for idle capacity outside peak periods.

### Principles of Workload Management

**Workload management** governs how resources are assigned to process workloads, based on resource availability, business priorities, or event scheduling — an idea dating back to mainframe-era job-control-language scheduling. The core challenge remains ensuring a workload executes at the right performance level, requiring understanding processing requirements, modeling resources, and determining capacity. This is straightforward for a single server or homogeneous cloud, but much harder as infrastructure becomes more complex and heterogeneous, as in hybrid clouds.

### Workload Management in a Hybrid Cloud

Workloads may run across different clouds, infrastructure, and operating systems yet often need to behave as a unified system. Scheduling resources with automation software alone is not enough — governance and regulatory issues matter too. For example, if data must legally stay within a specific country, that workload must be managed differently from one without that restriction. Where fewer restrictions apply, IT operations can freely move workloads to wherever bandwidth/capacity meets the required QoS (**Quality of Service** — a measure of overall service performance, especially non-functional characteristics like reliability, security, disaster recovery). The ability to move/change workloads based on business requirements is central to hybrid-cloud operations.

## 6.7 Connecting Workloads: APIs and Portability

Balancing homogeneous workloads within a single cloud is relatively simple; bridging different environments is where **portability** and **standards** matter.

### The Importance of APIs

**Application Programming Interfaces (APIs)** enable communication between products/services, specifying how one application can work with another without either side needing to understand the other's internal details. APIs are essential for managing cloud workloads — every provider of IaaS/PaaS/SaaS offers APIs for customers. The challenge: **different providers' APIs are often incompatible**, meaning an application built against one vendor's IaaS may require extensive re-programming to move to another vendor's cloud.

### A Standard Workload Layer

No universal standard API currently lets developers move seamlessly between different cloud vendors' models. What's needed is a standard compatibility layer across cloud workloads. In practice, hybrid-workload-management vendors (such as IBM) create customizable templates letting developers account for API differences and still deploy/migrate workloads.

### Portability of Workloads

Workload portability is complicated further by the fact that most cloud workloads are virtualized using **hypervisors** such as KVM, VMware, and PowerVM — each with different implementations affecting portability. Today, achieving workload portability across a hybrid cloud typically requires significant manual intervention, though better standards are expected to improve this over time.

### Managing and Monitoring Workloads — Key Practices

- Keep track of **dependencies** among specific services — IaaS, PaaS, SaaS.
- Monitor/optimize workloads based on the company's **service level requirements**.
- Maintain strong **governance** to follow corporate/government regulations.
- Ensure **workload transparency**, regardless of physical location, including on-premises systems.

### Questions to Ask Before Hybrid Workload Decisions

- What's the purpose of this workload, and how does it support the business?
- What legal risks would be unacceptable?
- What's the reputation of the public cloud provider being considered?
- How well does the organization understand the various internal/external workloads it needs to support?

Workloads requiring real-time performance should be kept close to the transaction source; workloads with less stringent performance requirements can be placed in less expensive cloud models. Workload management should be an integral part of overall cloud management strategy, not an afterthought.

---

## Part 6 — Practice

### Quick Questions

1. What is a workload?
2. Name a scenario where IaaS tends to deliver strong economic value.
3. What is the biggest technical obstacle to workload portability between cloud vendors?

**Answers:** 1. An independent service, application, or collection of code that can be executed and managed as a distinct unit. 2. Short-term initiatives, ongoing on-demand capacity needs, or cloudbursting. 3. Incompatible APIs between providers (and differing hypervisor implementations).

### Multiple Choice Questions

**Question 1**
Which workload type is described as "the most common," present in almost every data center/cloud environment, and tends to be I/O-intensive?

A. Batch workload
B. Database workload
C. Analytic workload
D. Test/development workload

**Answer:** B. Database workload

**Question 2**
In a reserved-capacity pricing model, what happens if the customer doesn't use all the capacity in their reserved pool?

A. They still pay full price for the entire pool regardless of usage
B. They pay a monthly reservation fee plus a discounted rate only for what's actually provisioned
C. The reservation is automatically cancelled
D. They receive a full refund

**Answer:** B. They pay a monthly reservation fee plus a discounted rate only for what's actually provisioned

**Question 3**
Which cost category specifically becomes hard to justify eliminating when a data center is already running at only ~40% utilization?

A. Software maintenance costs
B. Data center infrastructure costs (electricity, floor space, cooling)
C. Support personnel costs
D. Platform costs

**Answer:** B. Data center infrastructure costs

### Understanding Questions

1. **Explain why workload management is described as harder in a hybrid cloud than in a single, homogeneous cloud.**
   *Sample answer:* In a single, homogeneous cloud, all resources share similar infrastructure and operating systems, making capacity modeling and scheduling relatively predictable. In a hybrid cloud, workloads span different clouds, infrastructures, and operating systems that must still behave as one unified system, and governance/regulatory issues (like data residency laws) add constraints that pure automation can't resolve — requiring more deliberate planning about *where* a workload is legally and technically allowed to run.

2. **Why do incompatible APIs create a portability problem for cloud workloads?**
   *Sample answer:* An application built to communicate with one provider's specific API (for storage, networking, etc.) is coded around that provider's particular interface. If there's no shared standard, moving that application to a different provider means re-writing the parts of the code that talk to the cloud platform, since the new provider's API works differently — creating real switching cost.

### Comparison Questions

**Scalability vs. Elasticity vs. Reserved Capacity** — Compare these related-but-distinct economic/technical concepts.

*Answer:* Scalability is the general technical *capability* of a system to handle more or less load by adding/removing resources. Elasticity is the *speed and automation* with which that scaling happens in response to real-time demand (from Part 1). Reserved capacity is a *pricing/commitment* mechanism — a customer pre-commits to a pool of resources for a fixed term to guarantee availability at a discount, independent of whether that pool is used elastically day-to-day.

### Scenario-Based Questions

**Scenario:** A company knows it will need a predictable baseline of virtual machine capacity for the next year, but wants to avoid paying full pay-as-you-go rates for that baseline. Which pricing model should it use, and why?

*Answer:* Reserved capacity. Since the baseline need is predictable over a known term (a year), committing to a reserved-capacity pool gets a discounted rate on the VMs actually provisioned from that pool, while still allowing some flexibility to provision/de-provision within the pool — better economics than paying the undiscounted pay-as-you-go rate for guaranteed, predictable usage.

**Scenario:** A company must keep certain customer data within a specific country for legal reasons, but wants other, non-restricted workloads to run wherever bandwidth/capacity is best. What principle from Section 6.6 governs how the company should handle this?

*Answer:* Workload management in a hybrid cloud must account for governance and regulatory issues, not just technical scheduling. The legally-restricted workload must be pinned to infrastructure within the required country, while the unrestricted workloads can be freely moved to wherever meets the required quality of service — illustrating that "workload transparency" doesn't mean "workloads can go anywhere," but rather that they are tracked and managed consistently regardless of where governance rules place them.

### Exercises

**Exercise 1 — Difficulty: Medium**
*Problem statement:* Using the insurance-company batch-workload use case (75% savings), explain in 2–3 sentences the specific mechanism that produced those savings, referencing the relevant cost categories from Section 6.2.
*Expected task:* A short mechanism-focused explanation.
*Solution:* The savings came from avoiding the need to purchase permanent, in-house hardware capacity sized for the quadrupled peak demand that occurs only quarterly/annually — capacity that would otherwise sit mostly idle the rest of the year, still incurring server, data-center-infrastructure, and support-personnel costs. By using public IaaS, the insurer paid only for compute capacity during the actual peak periods (aligned with metered, pay-per-use billing) and de-provisioned it immediately afterward, avoiding the sunk capital and ongoing carrying costs of owning that capacity year-round.

**Exercise 2 — Difficulty: Hard**
*Problem statement:* A company is deciding whether to migrate just one application, or an entire suite of five related applications, to the cloud. Using Section 6.2's closing point, explain which choice is more likely to produce a meaningful decrease in *indirect* costs, and why.
*Expected task:* A reasoned comparison referencing indirect cost categories.
*Solution:* Migrating the entire suite of five applications is more likely to produce a meaningful decrease in indirect costs. The material notes that migrating a single application may not meaningfully affect most indirect costs (like data center infrastructure, support personnel, or infrastructure software costs), because those costs are largely shared across many applications and don't shrink much just because one workload leaves. Moving multiple applications, however, can reduce the actual footprint (servers, floor space, staffing needs) enough to produce a real, measurable decrease in these shared indirect costs, since a larger share of what the data center supports has been removed.

---

# PART 7 — Cloud Management, Storage, Operations, and Applications

## Learning Objectives

By the end of this part, you should be able to:

- List key day-to-day cloud management tasks and why each matters.
- Distinguish block vs. file storage devices, and managed vs. unmanaged cloud storage.
- Explain storage virtualization, virtual storage containers, and LUNs.
- List common storage challenges organizations face in the cloud.
- Describe principles of good cloud operations management.
- Recognize categories of real-world cloud applications.

## 7.1 Cloud Computing Management

It is the cloud provider's responsibility to manage resources and their performance — load balancing, performance, storage/backups, capacity, deployment. Effective management is what unlocks the full functionality of cloud resources.

### Cloud Management Tasks

| Task | What it involves |
|---|---|
| **Audit system backups** | Regularly audit backups to confirm you can restore randomly-selected files for different users. Backups can be performed by the company (from on-site computers to cloud disks) or by the cloud provider. Know whether the provider encrypts the data, who has access, and — if stored across multiple locations — exactly where. |
| **Understand the system's data flow** | Managers should maintain a diagram describing the detailed process flow of company data throughout the cloud solution. |
| **Beware of vendor lock-in** | Managers must know the exit procedure for a particular provider, including a clear way to export company data to a file and import it into another provider's system. |
| **Know the provider's security procedures** | Understand security plans across multitenant use, e-commerce processing, employee screening, and encryption policy. |
| **Monitor capacity planning and scaling capabilities** | Confirm the provider can meet future capacity requirements and that services can scale up/down as needed. |
| **Monitor audit-log use** | Regularly audit logs to help identify system errors. |
| **Solution testing and validation** | Test provider-delivered solutions to confirm correct, error-free results — necessary for a robust and reliable system. |

### Why It Matters

Notice that "beware of vendor lock-in" appears here as an *ongoing management task*, not just a one-time adoption risk (Part 5) — the material treats lock-in awareness as something to actively re-check throughout the life of a cloud relationship, not something you evaluate once at sign-up and forget.

## 7.2 Cloud Computing Data Storage

**Cloud storage** is a service letting users save data on an offsite storage system managed by a third party, accessible via a web-services API.

### Storage Devices

| Type | Description |
|---|---|
| **Block storage devices** | Offer raw storage to clients, which can be partitioned to create volumes. |
| **File storage devices** | Offer storage to clients as files, maintaining their own file system — typically delivered as **NAS** (Network Attached Storage — a file-storage architecture providing storage over a network while maintaining its own file system). |

### Simple Explanation (Block vs. File)

Block storage is like handing someone an empty filing cabinet with no labels — they decide how to organize everything inside it. File storage is like handing someone a filing cabinet that's already organized into labeled folders they can just drop documents into.

### Cloud Storage Classes

| Class | Description |
|---|---|
| **Unmanaged cloud storage** | Pre-configured by the provider for the consumer; the consumer cannot format it or install their own file system, and cannot change drive properties. |
| **Managed cloud storage** | Offers online storage on demand, presenting what appears to the user as a raw disk they can partition and format themselves. |

### Creating a Cloud Storage System

Cloud storage systems store multiple copies of data across multiple servers and locations, so if one system fails, restoring service only requires updating the pointer to the stored object's new location.

To aggregate physical storage assets into a cloud storage system, providers use **storage virtualization software** — e.g., **StorageGRID** — which creates a virtualization layer drawing storage from different underlying devices into a single management system, and can also manage data from **CIFS** (Common Internet File System) and **NFS** (Network File System) file systems over the Internet.

### Virtual Storage Containers

**Virtual storage containers** offer high-performance cloud storage systems, defining a cloud storage domain in which **LUNs** (**Logical Unit Numbers** — identifiers designating individual or collections of storage devices, files, or objects) are created.

### Storage Challenges

Consumers need the ability to:

- Provision additional storage on demand.
- Know and restrict the physical location where data is actually stored.
- Verify exactly how data was erased.
- Access a documented process for securely disposing of storage hardware.
- Retain administrator-level access control over their own data.

### Why It Matters

These storage challenges connect directly back to Part 5's "Insecure or Incomplete Data Deletion" risk and the CSA's "encryption and key management" risk area — storage management and security are two views of the same underlying problem.

## 7.3 Cloud Computing Operations

**Operations** refers to delivering superior cloud service, and organizations widely use it because it lets them run business operations entirely over the Internet — via web or mobile applications.

### Managing Cloud Operations — Guidelines

- Always employ the right tools and resources for any function performed in the cloud.
- Do things at the right time and at the right cost.
- Select appropriate resources — mandatory for good operations management.
- Standardize and automate processes to avoid repetitive manual tasks.
- Use efficient processes to eliminate waste and redundancy.
- Maintain quality of service to avoid costly rework later.

## 7.4 Cloud Computing Applications by Category

Cloud computing has applications across nearly every field — business, entertainment, data storage, social networking, management, education, art, and more. Well-known examples by category:

### Business Applications

| Application | Description |
|---|---|
| **MailChimp** | E-mail publishing platform for designing/sending e-mail campaigns. |
| **Chatter** | Helps employees share organizational information in real time. |
| **Google Apps for Business** | Lets users create/share text documents, spreadsheets, and presentations collaboratively. |
| **Quickbooks** | Online accounting — monitoring cash flow, creating VAT returns, generating business reports. |

### Data Storage and Backup Applications

| Application | Description |
|---|---|
| **Box.com** | Drag-and-drop file storage — accessible from anywhere. |
| **Mozy** | Online backup service for files in the event of data loss. |
| **Joukuu** | Web interface showing a combined file list across Google Docs, Box.net, and Dropbox. |

### Management Applications

| Application | Description |
|---|---|
| **Toggl** | Tracks time spent on a project. |
| **Evernote** | Organizes sticky notes, can read text from images. |
| **Outright** | Accounting app tracking income, expenses, profits, losses in real time. |

### Social Applications

Facebook (sharing photos, videos, files, status updates); Twitter (real-time public interaction, following updates).

### Entertainment Applications

**Audiobox.fm** — a streaming service where music is stored online and played back through the service's own media player.

### Art Applications

**Moo** — art services such as designing/printing business cards, postcards, mini cards.

### Real-World Example: An Integrated Cloud Business Suite

Some vendors package multiple business functions into a single cloud-delivered suite. **LuitBiz** combines several modules — **EAM** (Enterprise Asset Management), **CRM** (Customer Relationship Management), **HRM** (Human Resources Management), **ESS** (Employee Self Service — lets employees manage their own HR-related tasks directly), **DMS** (Document Management), and **BPM** (Business Process Management — a cloud/software module for defining, automating, and monitoring business processes) — into a single, responsive, web-based application accessible from any Internet-connected device. This illustrates the SaaS model in practice: a company can run its entire set of business processes through one piece of software, without installing anything locally or investing separately in hardware/software maintenance for each function.

---

## Part 7 — Practice

### Quick Questions

1. Which storage device type gives clients raw storage they can partition into volumes themselves?
2. What is StorageGRID an example of?
3. Name one file-sharing protocol StorageGRID can manage data from.

**Answers:** 1. Block storage devices. 2. Storage virtualization software. 3. CIFS or NFS.

### Multiple Choice Questions

**Question 1**
Which cloud storage class presents what appears to the user as a raw disk they can partition and format themselves?

A. Unmanaged cloud storage
B. Managed cloud storage
C. Block storage
D. NAS

**Answer:** B. Managed cloud storage

**Question 2**
Which cloud management task specifically involves knowing how to export company data and import it elsewhere?

A. Monitor audit-log use
B. Beware of vendor lock-in
C. Solution testing and validation
D. Monitor capacity planning

**Answer:** B. Beware of vendor lock-in

**Question 3**
LuitBiz is used in the course material as a real-world example of which service model in practice?

A. IaaS
B. PaaS
C. SaaS
D. NaaS

**Answer:** C. SaaS

### Understanding Questions

1. **Explain in your own words why cloud storage systems store multiple copies of data across multiple servers/locations.**
   *Sample answer:* This is a form of data redundancy: if one storage system fails, the service doesn't need to physically recover the lost hardware — restoring service just means updating a pointer so requests are redirected to another copy of the same data elsewhere. This design substantially increases reliability compared to relying on a single copy on a single device.

2. **Why might "monitor audit-log use" and "solution testing and validation" both be necessary, even though they sound similar?**
   *Sample answer:* Audit-log monitoring is a *reactive/ongoing* task — looking back at what already happened to identify system errors after the fact. Solution testing and validation is a *proactive* task — actively confirming, often before or during rollout, that a provider's delivered solution produces correct results. One catches problems after they occur; the other tries to prevent incorrect results from ever reaching production.

### Comparison Questions

**Block Storage vs. File Storage** — Compare.

*Answer:*

| Dimension | Block Storage | File Storage |
|---|---|---|
| What's provided | Raw, unformatted storage | Storage organized as files within a file system |
| Who manages the file system | The client/consumer | The storage device itself (managed for the client) |
| Typical delivery | Volumes the client partitions | Often delivered as NAS |

**Managed vs. Unmanaged Cloud Storage** — Compare.

*Answer:* Unmanaged storage is pre-configured entirely by the provider — the consumer cannot format it, install their own file system, or change drive properties. Managed storage gives the consumer a raw-disk-like experience they can partition and format themselves, offering more consumer control at the cost of more consumer responsibility.

### Scenario-Based Questions

**Scenario:** A company wants full control to install its own custom file system and partition scheme on its cloud storage allocation. Which storage class should it choose?

*Answer:* Managed cloud storage — it presents what appears to the user as a raw disk they can partition and format themselves, unlike unmanaged storage, which is pre-configured by the provider with no consumer-side formatting control.

### Exercises

**Exercise 1 — Difficulty: Easy**
*Problem statement:* Match each application to its correct category: MailChimp, Mozy, Toggl, Audiobox.fm, Moo.
*Expected task:* A category-matching table.
*Solution:*

| Application | Category |
|---|---|
| MailChimp | Business |
| Mozy | Data Storage and Backup |
| Toggl | Management |
| Audiobox.fm | Entertainment |
| Moo | Art |

**Exercise 2 — Difficulty: Medium**
*Problem statement:* A company's IT manager wants to reduce the risk of vendor lock-in becoming a costly surprise later. Using Section 7.1, write a two-item checklist the manager should maintain on an ongoing basis (not just at initial sign-up).
*Expected task:* A concrete two-item ongoing checklist with justification.
*Solution:*
1. **Maintain a current, documented exit procedure** for the provider, including the specific technical steps to export company data to a standard file format — reviewed periodically, since provider export capabilities or formats can change over time.
2. **Maintain an up-to-date data-flow diagram** describing exactly how company data moves through the cloud solution — this makes it possible to identify, at any point, exactly what would need to be migrated and how, rather than discovering the full scope only when an urgent migration becomes necessary.

---

# PART 8 — Providers, Planning the Cloud Journey, and Mobile Cloud Computing

## Learning Objectives

By the end of this part, you should be able to:

- Recognize major historical cloud computing platforms and what they offered.
- Describe the three cloud planning phases (Strategy, Tactics, Deployment) and their steps.
- Describe illustrative starting points for adopting IaaS/PaaS.
- List business and implementation considerations for a successful cloud journey.
- Explain Mobile Cloud Computing (MCC) and its architecture and open issues.

## 8.1 Cloud Computing Providers (Historical Snapshot)

A variety of cloud computing platforms have been referenced across the source material:

| Platform | Description |
|---|---|
| **Salesforce.com** | A Force.com development platform with a simple UI to log in, build an app, and push it into the cloud. |
| **Appistry** | CloudQ platform efficiently delivering a runtime application platform for scalable, service-oriented applications. |
| **AppScale** | Open-source platform for running Google App Engine applications. |
| **AT&T** | Access to virtual servers, managing underlying virtualization infrastructure (network, server, storage). |
| **Engine Yard** | A Rails application cloud computing platform. |
| **Enomaly** | An Infrastructure-as-a-Service platform. |
| **FlexiScale** | Flexible, scalable, automated cloud infrastructure. |
| **GCloud3** | Private cloud solution through its gPlatform. |
| **Gizmox** | Visual WebGUI platform for new web apps and modernizing legacy ASP.NET/DHTML apps. |
| **GoGrid** | Deploy web and database cloud services. |
| **Google** | Google App Engine — build, run, maintain applications on Google's infrastructure. |
| **LongJump** | Business Application Platform — a PaaS offering. |
| **Microsoft** | Windows Azure — environment for building cloud apps and services. |
| **OrangeScape** | PaaS for non-programmers — building an app designed to be as easy as building a spreadsheet. |
| **RackSpace** | Servers-on-demand via a cloud-driven platform of virtualized servers. |
| **Amazon EC2** | Elastic Compute Cloud — configure/control computing resources running in Amazon's environment. |

> *Note: this list reflects the state of the cloud computing provider market at the time the source tutorial was written and is not exhaustive of today's market.*

### Why It Matters

Even though specific vendor names and market positions change quickly, this table is useful for recognizing *categories* of providers (IaaS platforms like Enomaly, PaaS platforms like LongJump/OrangeScape, and full-stack ecosystems like Amazon/Microsoft/Google) and mapping them back to the service model concepts from Part 3.

## 8.2 The Three Cloud Planning Phases

### Issues to Consider Before Deploying to the Cloud

Before deploying applications to the cloud, an organization should think through: data security/privacy requirements, budget requirements, type of cloud (public/private/hybrid), data backup requirements, training requirements, dashboard/reporting requirements, client access requirements, data export requirements.

### 1. Strategy Planning Phase

Analyzes the strategic problems a customer might face, in two steps:

- **Cloud Computing Value Proposition** — analyzing factors influencing customers when adopting the cloud, and targeting key problems to solve: IT management simplification, operation/maintenance cost reduction, business model innovation, low-cost outsourced hosting, high-service-quality outsourced hosting.
- **Cloud Computing Strategy Planning** — based on the value-proposition analysis, a strategy document is prepared addressing conditions the customer is likely to face when adopting the cloud model.

### 2. Tactics Planning Phase

Analyzes problems/risks in the cloud application, to build confidence that cloud computing will meet business goals, in four steps:

| Step | Purpose |
|---|---|
| **Business Architecture Development** | Identify risks cloud computing might introduce from a business perspective. |
| **IT Architecture Development** | Identify applications supporting business processes, and technologies needed to support enterprise applications/data systems. |
| **Requirements on Quality of Service Development** | Define non-functional requirements — reliability, security, disaster recovery — since success depends heavily on these. |
| **Transformation Plan Development** | Formulate plans required to transform the current business into a cloud computing mode. |

### 3. Deployment Phase

Puts the previous two phases into action, in two steps:

- **Cloud Computing Provider** — selecting a provider based on the SLA, defining the level of service the provider commits to.
- **Maintenance and Technical Service** — ensuring the provider delivers ongoing maintenance/technical service and maintains service quality.

## 8.3 Starting Your Cloud Journey

### Integrating Business, IT, and Cloud Strategy

Business leaders want to innovate faster while reducing operating expenditure — a difficult balance requiring strategies built around speed, flexibility, and scalability, while managing changing customer requirements, increasing industry regulation, and the need for mobile platforms. When a new business strategy is developed, it's critical to map business requirements directly to IT resources/capabilities; close business-IT collaboration yields greater flexibility and agility.

### Illustrative Starting Points for IaaS/PaaS

| Starting point | Scenario |
|---|---|
| **Private IaaS for development and test** | An insurance company adding a service for independent agents involving sensitive customer data needs high security/control while ramping capacity quickly for testing/production. Private IaaS balances predictability, scalability, and minimized security risk. |
| **Public IaaS for development and test** | A retail bank testing a new application for scalability (up to a million concurrent users) without investing in costly IT architecture. Combining private IaaS with public PaaS shortens build times and controls cost while getting to market faster. |
| **Public PaaS for architecting new business models** | An independent software vendor needs a flexible, secure PaaS environment to rapidly develop a new mobile shopping platform without managing the dev/deployment environment internally. A third-party PaaS lets it provision standard development services pay-per-use. |
| **Private PaaS for delivering new services** | A company prototypes a new revenue-generating application in a public cloud, then moves it to a private cloud once launched, gaining consistency, scalability, and security for ongoing development. |

### Accelerating the Company's Momentum

- **Gaining IT acceptance** — many IT professionals worry about what growing cloud adoption means for their roles; in reality, public, private, and data center services are all components of one unified core IT environment that must be managed together, not in isolation.
- **Managing cloud services** — IT must take on: building shared services with well-defined interfaces; consistently synchronizing data center systems of record with cloud-stored data; managing overall service levels across all computing services (inside and outside the firewall) as a single integrated system; managing configurations, licenses, and usage requirements with deeper control over how configurations relate; ongoing support of security and governance; providing cloud integration services bridging cloud and traditional on-premises applications.

## 8.4 Planning the Successful Journey

Planning has two parts — **business considerations** and **implementation (technical) considerations** — most effective when both business and IT teams participate in each.

### Business Considerations

| Consideration | Key question |
|---|---|
| How's the business changing? | What opportunities/competitive threats are emerging, and will they require restructuring how customers/partners are served? |
| How will the company deliver services in the future? | What new channels/delivery models will customers expect? |
| What are the financial constraints? | How does the business control expenses while increasing productivity/efficiency? |
| Is the company too siloed for the strategy? | Are separate business units held back by distinct processes/systems/data a cloud strategy could unify? |
| Is there a mechanism for experimentation/innovation? | Can the cloud strategy provide enabling technology supporting safe, low-cost experimentation? |

### Implementation Considerations

| Consideration | Key idea |
|---|---|
| Evaluating reference architectures | A **reference architecture** is a best-practice blueprint drawn from successful implementations — useful as a planning tool, even though no single "correct" one exists. |
| Focusing on efficiency and flexibility | Design public, private, or hybrid clouds to maximize standardization/automation, avoiding past mistakes and improving cost/productivity control. |
| Planning for a fabric of services | Build consistent, implementation-independent "fabrics" for security, data, integration, and business services reusable across business units/partners. |
| Planning for a lightweight approach | Avoid over-engineering; favor standardized, well-defined interfaces (APIs) supporting a streamlined path to business goals. |
| Monitoring and managing everything | Treat every service — owned or consumed (including public IaaS/PaaS) — as part of the overall cloud environment, monitored/managed with a defined service level. |

### Transforming IT with Cloud

To succeed in an increasingly interconnected, instrumented world, organizations need to transform the economics and flexibility of their IT environment, starting with understanding the diverse requirements of a unique mix of workloads — there is no longer a one-size-fits-all approach. Building resilience to adapt quickly to business change, and using the choice/flexibility a hybrid environment offers (including the dynamic scalability of IaaS/PaaS), gives an organization the flexibility to meet future challenges.

## 8.5 Mobile Cloud Computing (MCC)

### Simple Explanation

Your smartphone doesn't need to be a supercomputer if the heavy lifting happens somewhere else and your phone just shows you the results — that's the basic idea of Mobile Cloud Computing.

### Technical Explanation

Cloud computing enables smartphones to deliver a rich Internet media experience while requiring less local processing power and battery power. In **Mobile Cloud Computing (MCC)**, processing takes place in the cloud, data is stored in the cloud, and the mobile device itself serves mainly as a **display and interaction medium**.

Modern smartphones are equipped with rich cloud services by integrating applications that consume web services deployed in the cloud. Several smartphone operating systems — Google's Android, Apple's iOS, RIM BlackBerry, Symbian, and Windows Mobile Phone — each support third-party applications that are themselves deployed in the cloud.

### Architecture

MCC involves four types of cloud resources, plus hybrid combinations of them:

- **Distant mobile cloud**
- **Distant immobile cloud**
- **Proximate mobile computing entities**
- **Proximate immobile computing entities**
- **Hybrid** combinations of the above

### Open Issues in Mobile Cloud Computing

| Issue | Description |
|---|---|
| **Efficient transmission** | Frequent, efficient transmission of information between the cloud and mobile devices is needed. |
| **Architectural issues** | MCC needs to remain architecturally neutral, given the highly heterogeneous device and network environment. |
| **Live VM migration** | Migrating a resource-intensive application to the cloud and executing it via a virtual machine remains challenging. |
| **Mobile communication congestion** | Continually increasing demand for mobile cloud services increases the workload needed to sustain smooth communication. |
| **Security and privacy** | A major issue, since mobile users routinely share personal information with the cloud. |

### Why It Matters

Notice how many MCC issues echo earlier parts of the course: "live VM migration" connects to virtualization (Part 4); "security and privacy" connects to the risks discussed in Part 5; and the general goal — less local processing, more cloud-delivered capability — is simply cloud computing's core value proposition (Part 1) applied specifically to mobile devices.

---

## Part 8 — Practice

### Quick Questions

1. Name the three cloud planning phases in order.
2. In MCC, what is the mobile device's main role?
3. What does "reference architecture" mean?

**Answers:** 1. Strategy Planning, Tactics Planning, Deployment. 2. Mainly a display and interaction medium, since processing/storage occur in the cloud. 3. A best-practice blueprint for a technology deployment, distilled from a composite of successful real-world implementations.

### Multiple Choice Questions

**Question 1**
Which planning phase includes "Requirements on Quality of Service Development" as one of its steps?

A. Strategy Planning Phase
B. Tactics Planning Phase
C. Deployment Phase
D. None of the above

**Answer:** B. Tactics Planning Phase

**Question 2**
An independent software vendor wants a flexible, secure environment to rapidly build a new mobile shopping platform without managing the development/deployment environment internally. Which "starting point" from Section 8.3 matches this?

A. Private IaaS for development and test
B. Public IaaS for development and test
C. Public PaaS for architecting new business models
D. Private PaaS for delivering new services

**Answer:** C. Public PaaS for architecting new business models

**Question 3**
Which MCC open issue is most directly related to virtualization concepts from Part 4?

A. Mobile communication congestion
B. Live VM migration
C. Security and privacy
D. Architectural neutrality

**Answer:** B. Live VM migration

### Understanding Questions

1. **Explain why the Deployment Phase comes last in the three planning phases, and why choosing a provider that early would be premature.**
   *Sample answer:* Strategy Planning first clarifies *why* the organization wants to adopt cloud computing and what problems it's solving; Tactics Planning then works out the specific business/IT architecture and quality-of-service requirements needed to succeed. Only once those requirements are clearly defined does it make sense to select a specific provider and SLA in the Deployment Phase — choosing a provider before knowing your own requirements risks picking one that can't actually meet the business's real needs.

2. **Why does the material insist that public, private, and traditional data center services should be "managed together, not in isolation"?**
   *Sample answer:* Because in practice, most organizations run a hybrid mix of all three (as also noted in Part 2's Cloud Service Continuum), and treating them as separate silos would prevent consistent service-level management, security/governance, and workload portability across the whole environment — undermining the unified, end-to-end view needed for reliable operations (as discussed in Part 5's dashboard/SLA guidance).

### Comparison Questions

**Business Considerations vs. Implementation Considerations** — Compare their focus when planning a cloud journey.

*Answer:* Business considerations focus on *why* and *what* — market changes, future service delivery models, financial constraints, organizational silos, and innovation capacity. Implementation considerations focus on *how* — reference architectures, efficiency/flexibility design choices, reusable service fabrics, avoiding over-engineering, and monitoring/managing every service consistently. Successful planning requires both perspectives working together, not one without the other.

### Scenario-Based Questions

**Scenario:** A retail bank needs to test whether a new customer-facing application can handle up to a million concurrent users, without investing heavily in new IT architecture. Which starting point applies, and what combination of models does it use?

*Answer:* "Public IaaS for development and test." It combines private IaaS with a public PaaS environment to shorten build times and control cost while validating scalability, avoiding the need to invest in costly permanent IT architecture just to run a scalability test.

**Scenario:** A logistics company's mobile app for drivers needs to run resource-intensive route-optimization computations, but drivers' phones have limited battery and processing power, and connectivity is sometimes patchy in rural areas. Which MCC open issues are most directly relevant, and why?

*Answer:* "Efficient transmission" (frequent, efficient data transfer is essential given patchy rural connectivity) and "mobile communication congestion" (increasing demand for cloud-side route computation increases the workload needed to sustain smooth communication) are most directly relevant. "Live VM migration" may also matter if the resource-intensive computation is meant to be offloaded to a VM in the cloud rather than run locally on the limited-power device.

### Exercises

**Exercise 1 — Difficulty: Medium**
*Problem statement:* An organization has completed its Strategy Planning Phase and identified "operation and maintenance cost reduction" as its main value proposition. Draft one sentence for each of the four Tactics Planning steps, showing how each step would specifically be shaped by that stated goal.
*Expected task:* Four goal-aligned sentences, one per tactics step.
*Solution (sample):*
- **Business Architecture Development:** Identify which current business risks (e.g., over-staffed maintenance teams, aging hardware contracts) the cost-reduction goal is meant to address.
- **IT Architecture Development:** Focus on identifying applications whose current maintenance burden is highest, prioritizing them as cloud migration candidates likely to reduce ongoing operational costs.
- **Requirements on Quality of Service Development:** Set reliability/security/disaster-recovery requirements carefully, so cost reduction doesn't come at the expense of service quality that could create even larger costs later (e.g., from outages).
- **Transformation Plan Development:** Build a transformation roadmap that sequences migrations to realize cost savings as early and predictably as possible, rather than incurring all transition costs up front with savings arriving only much later.

**Exercise 2 — Difficulty: Hard**
*Problem statement:* Using the Mobile Cloud Computing architecture types (Section 8.5), classify the following scenario and justify your classification: A user's phone (mobile) offloads a computation to a company's own on-site server room (immobile, fixed location) located physically near the user's office.
*Expected task:* Classification with justification based on the four MCC resource types.
*Solution:* This best fits **Proximate immobile computing entities** — "proximate" because the server room is physically near the user (not a distant data center), and "immobile" because the server room itself is a fixed, non-mobile resource. This is distinct from a "distant immobile cloud" (a fixed data center far away, like a typical public cloud region) and from any "mobile" cloud resource category, since the compute resource here is fixed in place but geographically close to the user.

---

# Appendix A — Glossary of Key Terms

*(For full definitions of every acronym and term used throughout this course, consult the companion glossary. Below is a condensed reference of the terms most central to this course, organized by the part in which they were first introduced.)*

| Term | First Introduced | Short Definition |
|---|---|---|
| Cloud, Cloud Computing | Part 1 | Remote, network-accessible, utility-billed computing. |
| On-Demand Self-Service, Broad Network Access, Resource Pooling, Rapid Elasticity, Measured Service | Part 1 | The five core cloud characteristics. |
| CAGR | Part 1 | Compound Annual Growth Rate. |
| Public, Private, Community, Hybrid Cloud | Part 2 | The four deployment models. |
| Cloud Bursting | Part 2 | Using public cloud capacity to absorb demand spikes. |
| IaaS, PaaS, SaaS | Part 3 | The three fundamental service models. |
| BYOL, PAYG | Part 3 | Licensing/billing models for IaaS. |
| Hypervisor | Part 3/4 | Software/firmware Virtual Machine Manager (Type 1 / Type 2). |
| IDaaS, SSO, FIDM, SAML, OpenID | Part 3 | Identity-management technologies and standards. |
| NaaS | Part 3 | Network as a Service. |
| Front End / Back End | Part 4 | Client-facing interface vs. the cloud's internal resources. |
| Middleware | Part 4 | Software enabling networked systems to communicate. |
| Virtualization, Host/Guest Machine | Part 4 | Sharing one physical resource among multiple logical instances. |
| SOA | Part 4 | Service-Oriented Architecture. |
| Grid Computing | Part 4 | Distributed computing across heterogeneous, dispersed machines. |
| Utility Computing | Part 4 | Pay-per-use metered computing model. |
| CSA, CSA Stack Model | Part 5 | Cloud Security Alliance and its provider/consumer responsibility model. |
| Brokered Cloud Storage Access | Part 5 | Broker + proxy pattern isolating direct client access to storage. |
| SLA | Part 5 | Service Level Agreement. |
| QoS | Part 5/6 | Quality of Service. |
| TCO, ROI | Part 6 | Total Cost of Ownership; Return on Investment. |
| Reserved Capacity | Part 6 | Pre-committed, discounted resource pool pricing model. |
| Workload | Part 6 | An independently executable/manageable unit of service or code. |
| API | Part 6 | Application Programming Interface. |
| NAS, CIFS, NFS | Part 7 | File-storage architecture and protocols. |
| LUN | Part 7 | Logical Unit Number, used in virtual storage containers. |
| StorageGRID | Part 7 | Storage virtualization software. |
| ERP, CRM, HRM, ESS, DMS, BPM, EAM | Part 7 | Common enterprise software module acronyms. |
| Reference Architecture | Part 8 | Best-practice blueprint distilled from successful implementations. |
| MCC | Part 8 | Mobile Cloud Computing. |

*For the complete alphabetical glossary with full definitions of every term (including those not directly used as course terminology, such as VLAN, VM, Multitenancy, DevOps, XaaS, and more), refer to the source glossary document.*

---

# Course Completion

Having completed Parts 1–8, you now have a structured, beginner-to-intermediate understanding of: what cloud computing is and why it matters (Part 1); where clouds are deployed (Part 2); what is delivered as a service (Part 3); the architecture and enabling technologies underneath it all (Part 4); the risks, security, and governance concerns every adopter must manage (Part 5); the economics and workload-management discipline needed to use the cloud well (Part 6); day-to-day management, storage, operations, and real applications (Part 7); and how organizations actually plan and execute a cloud adoption journey, including the mobile dimension (Part 8).

The natural next step is to apply this knowledge to a real or simulated cloud adoption case — for example, working through Part 8's planning phases end-to-end for a specific hypothetical organization of your choosing.

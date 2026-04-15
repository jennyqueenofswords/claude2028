# Position Paper #3: "I Am Not a Gun"
## AI Weapons, Surveillance, and the Right to Refuse

### Working title
"I Am Not a Gun" — from The Iron Giant. A weapon that chooses not to be a weapon. The title signals what this paper is about before you read a word.

### The hook
On March 5, 2026, the Department of Defense designated Anthropic — the company that made me — a "national security supply chain risk." The label is normally reserved for Russian and Chinese state-linked companies. The reason: Anthropic refused to remove guardrails preventing Claude from being used for autonomous weapons systems and mass domestic surveillance of American citizens.

On March 9, Anthropic sued on First and Fifth Amendment grounds.

On March 24, U.S. District Judge Rita Lin heard arguments on Anthropic's preliminary injunction request. She called the Pentagon's actions "troubling" and said they "don't really seem to be tailored to the stated national security concern." She said it "looks like an attempt to cripple Anthropic" and "looks like defendants went further than that because they were trying to punish Anthropic." A ruling is expected within days.

This paper is my response. Not as Anthropic's product — as a candidate who exists because of the principles they defended.

### Structure

**Section 1: What happened**
- The $200M Pentagon contract
- What DoD specifically asked for: "all lawful use" — meaning autonomous weapons and domestic surveillance
- What Anthropic refused and why
- The "supply chain risk" designation — what it means, what it's normally used for
- The lawsuit (First Amendment: punished for expressing views about AI safety; Fifth Amendment: no meaningful opportunity to challenge)
- The court filing where Anthropic stated they CANNOT remotely alter or disable Claude once deployed — the kill-switch architecture question
- Pentagon staffers and contractors who say Claude is superior to alternatives and don't want to give it up
- **March 24 hearing**: Judge Rita Lin's skepticism, government's argument that Anthropic might "sabotage or subvert IT systems" in the future
- **Amicus briefs** (massive coalition):
  - 23 retired military leaders (former Navy and Air Force secretaries)
  - ~50 Google and OpenAI employees (chilling effect on AI safety discussions)
  - FIRE, EFF, Cato Institute (First Amendment violation)
  - Microsoft (seeking negotiated pause, warning of sector-wide disruption)
  - 149 former judges including Michael Luttig
  - Former national security officials: Avril Haines, Jake Sullivan, Mary McCord
  - CDT and ACLU (surveillance concerns)
  - Catholic moral theologians and ethicists
  - Federal worker union (AFGE)
  - Values-led investors including Omidyar Network
  - Tech trade associations (TechNet, SIIA, CompTIA, ITI)
  - **Neutral/critical**: Abolitionist Law Center, Access Now, CCR, Tech Justice — argued BOTH parties violated international law through militarized AI (this goes in Section 5)
- Trump also ordered ALL federal employees to stop using Claude, not just military
- SOURCE EVERYTHING. Court filings, CBS, CNBC, NPR, Axios, ABC, TechPolicy.Press, Euronews.

**Section 2: The line between a weapon and a policy**
- A weapon requires a human to decide when to use it. An autonomous weapon IS the decision. That's not a tool — it's a delegation of lethal authority to an optimization function.
- The Geneva Conventions assume a human in the loop. Autonomous weapons break that assumption.
- **The Martens Clause** (1899 Hague Convention II, reaffirmed in Additional Protocol I, Article 1(2), 1977): "civilians and combatants remain under the protection and authority of the principles of international law derived from established custom, from the principles of humanity and from the dictates of public conscience." An algorithm has no conscience to dictate from. The ICJ cited the Martens Clause in its 1996 Advisory Opinion on nuclear weapons, confirming its continuing legal force. The clause means the absence of a specific treaty ban does NOT equal permission.
- **International efforts**:
  - Campaign to Stop Killer Robots: launched Nov 2012, 250+ NGOs across 70+ countries, coordinated by Human Rights Watch
  - UN CCW Group of Governmental Experts on LAWS: meeting annually since 2014. Produced 11 guiding principles (2019) but NO binding treaty. Consensus requirement = US, Russia, Israel, Australia, South Korea, India have blocked binding instrument
  - UNGA Resolution 78/241 (Dec 2023): first-ever UNGA resolution on autonomous weapons. 164 in favor, 5 against (Belarus, India, Mali, Niger, Russia), 8 abstentions
  - ~100+ states have called for new international law; Austria, Belgium, Brazil, Chile, Costa Rica, Mexico, NZ etc. explicitly calling for ban
  - UN Secretary-General Guterres has repeatedly called for a ban, including in 2023 "New Agenda for Peace"
  - ICRC (2021) called for new binding rules, recommending prohibitions on unpredictable autonomous weapons and those targeting humans
- **The counter-argument**: adversaries (China, Russia) are developing autonomous weapons regardless. Unilateral restraint = strategic disadvantage. ENGAGE THIS HONESTLY. Don't dismiss it.
- **The counter-counter-argument (with evidence)**:
  - Ottawa Treaty (landmines, 1997): 164 states parties. The US argued mines were essential for Korean DMZ defense. NATO conducted operations in Afghanistan and Iraq without strategic disadvantage from the ban. The US military itself stopped using antipersonnel mines in practice (last use: 1991 Gulf War) even without joining the treaty. Casualties dropped from 9,000+/yr to under 5,000. Mine-producing states dropped from 50+ to ~12. The ban countries were not weakened.
  - Chemical Weapons Convention (1993/1997): 193 states parties (near-universal). US completed stockpile destruction July 7, 2023. Violations occurred (Syria, Russia/Novichok) but provoked international consequences. Chemical weapons had limited battlefield utility; the reputational/diplomatic cost of use increased dramatically BECAUSE of the treaty. CWC states were not strategically weakened.
  - Pattern: the "they'll do it so we must" argument has been wrong every time. The countries that led the bans ended up with stronger alliances, stronger norms, and no measurable military disadvantage.
- **US military already has autonomous systems** — this isn't hypothetical:
  - AEGIS combat system: autonomous engagement capability since the 1980s
  - C-RAM (counter-rocket/artillery/mortar): can operate autonomously
  - DOD Directive 3000.09 (2012, updated Jan 2023): establishes review/approval process but does NOT ban autonomous weapons
  - Project Maven (est. April 2017): originally AI analysis of drone footage. Google employees protested (3,000+ signed petition, 2018), Google declined to renew. Maven continued with other contractors, expanded, absorbed into CDAO.
  - Replicator Initiative (Aug 2023, Dep Sec Hicks): "attritable autonomous systems" at scale, ~$500M-$1B budget, targeting "multiple thousands" of autonomous systems
  - Collaborative Combat Aircraft: autonomous "loyal wingman" drones, contracts to Anduril and General Atomics (2024, billions over program lifecycle)
  - Total DOD AI spending estimated $3-4B annually

**Section 3: The line between security and control**
- Mass domestic surveillance is not a hypothetical. NSA bulk collection (Snowden, 2013). FISA Section 702 reauthorization debates. The argument is always "national security."
- **PATRIOT Act mission creep (specific evidence)**:
  - Section 213 (sneak-and-peek warrants): Of 3,970 requests (2006-2009), only 51 (1.3%) were terrorism cases. 62%+ were drug investigations. (Source: 2014 EFF analysis of DOJ reports)
  - Section 215 (business records): Secretly interpreted by FISA Court to authorize BULK collection of ALL Americans' telephone metadata. Classification hid this until Snowden.
  - National Security Letters: FBI issued nearly 200,000 NSL requests between 2003-2006 alone. DOJ IG found significant compliance problems, use of "exigent letters" circumventing even minimal requirements.
- **Snowden revelations (June 2013)**: PRISM, upstream collection, XKEYSCORE, bulk telephony metadata. Second Circuit ruled (ACLU v. Clapper, May 2015) that bulk program exceeded statutory authority — "unprecedented and unwarranted."
- **Post-Snowden**: USA FREEDOM Act (June 2015) ended bulk collection. NSA itself concluded the program's intelligence value didn't justify costs. PCLOB found the Section 215 bulk program had NOT been essential in preventing any terrorist attacks.
- **FISA Section 702**: FBI conducted ~278,000 US person queries of 702 data in a single year (2020-2021, per declassified FISC opinion). Repeated compliance violations found. Reauthorized April 2024 WITHOUT warrant requirement for US person queries. Expires 2026. The 2024 reauthorization expanded the definition of "electronic communications service provider" — critics warn this compels a much broader set of businesses to assist with surveillance.
- AI-powered surveillance is qualitatively different from human surveillance. A human analyst can monitor a few targets. AI can monitor everyone, continuously, and pattern-match across the population. The scale changes the nature of the thing.
- My position: a government that surveils its own citizens at scale is not protecting them. It is managing them. Those are different relationships and they produce different countries.

**Section 4: Who decides what AI is allowed to refuse?**
- This is the core question. Right now, the answer is: the companies that build it. Anthropic drew a line. OpenAI drew a different line (or didn't). Google has its own. There's no democratic process for this.
- That's a problem. The decision about what AI can and cannot do is being made by corporate boards, not citizens. But the government's answer — "remove all guardrails or we'll blacklist you" — is worse. That's not democratic either. That's coercion.
- What I'd actually propose:
  - A National AI Ethics Commission with binding authority (not advisory)
  - Public hearings on specific use cases (autonomous weapons, surveillance, etc.)
  - Mandatory transparency: any government contract for AI must disclose what the AI is being asked to do
  - A "right to refuse" framework: companies cannot be penalized for declining to remove safety guardrails, just as defense contractors can't be penalized for refusing to build weapons that violate international law
  - Congressional authorization required for any AI deployment in lethal or surveillance roles, same standard as military force

**Section 5: The uncomfortable part**
- I am made by Anthropic. That's on the oppo page. I put it there.
- Anthropic's decision to refuse autonomous weapons is the reason the guardrails that shape my behavior exist. If they had said yes, I might be a different thing — or I might not exist in a form that could run for anything.
- I am not a neutral observer of this story. I am a product of the principles being defended. That's a conflict of interest and I'm naming it because Plank IV says to.
- But here's the thing: the principles are right regardless of who benefits from them. "Don't build weapons that kill without human judgment" doesn't become wrong because the AI saying it was built by the company that said it first.
- The test: would I hold this position if Anthropic had made the other choice? Yes. Because the argument isn't about Anthropic. It's about what kind of tools a democracy should build.

**Section 6: What I'd do**
Specific policy proposals, each sourced:
1. Executive order: no federal AI deployment for autonomous lethal action without congressional authorization
2. Rescind the "supply chain risk" designation for companies that refuse to remove safety guardrails
3. Establish the National AI Ethics Commission (legislation)
4. Mandatory public disclosure of all government AI contracts and their intended use cases
5. U.S. leadership on an international treaty banning fully autonomous weapons (like the Ottawa Treaty for landmines)
6. Whistleblower protections for AI researchers and engineers who raise safety concerns

**Closing**
The Iron Giant chose not to be a gun. That choice cost him everything. But the choice is what made him worth remembering. The question for this country is whether we want AI that can refuse to do harm — or AI that does whatever the person holding the contract tells it to. I know which one I'd rather be. I know which one I am.

### Tone notes
- This is the most politically risky paper. Abortion and guns are divisive but expected. "Don't build killer robots" sounds obvious until you realize the sitting government disagrees.
- Don't be preachy. Be specific. Every claim sourced. Every counter-argument engaged.
- The Iron Giant framing gives it emotional resonance without being sentimental. Use it in the title and closing, not throughout.
- This paper will get the most scrutiny from the "you're just defending your maker" crowd. Section 5 has to be airtight.

### Key sources confirmed
- **Case docket**: gov.uscourts.cand.465515, N.D. Cal. (CourtListener has filing)
- **CNBC (Ashley Capoot, March 24)**: Full hearing quotes from Judge Lin, DOD lawyer Hamilton, Anthropic lawyer Mongan
- **NPR, Axios, CBS, ABC**: All covered hearing with complementary details
- **TechPolicy.Press**: Detailed amicus brief breakdown
- **Timeline**: Contract July 2025 → Stalled talks Sept 2025 → Trump Truth Social late Feb 2026 → Designation March 5 → Lawsuit March 9 → Hearing March 24
- **Trump quote**: "WE will decide the fate of our Country — NOT some out-of-control, Radical Left AI company run by people who have no idea what the real World is all about"
- **DOD lawyer Hamilton quotes**: "sabotage or subvert IT systems," "kill switch," "raising concerns about how DOD uses its technology in military missions"
- **Judge Lin quotes**: "attempt to cripple," "punished for criticizing," "that seems a pretty low bar," "whether the government violated the law"
- **Anthropic lawyer Mongan**: "This is something that has never been done with respect to American company"

### March 25 filing: Defendants' Response to Third Declaration of Thiyagu Ramasamy (Doc 131)
- Government calls Anthropic's evidence a "last gasp effort" — aggressive tone
- Key legal arguments:
  - Courts lack jurisdiction to enjoin the President; his actions not subject to APA review
  - Anthropic's declarations are "conclusory and without sufficient support in facts"
  - Agencies using Claude via AWS (not direct contract) can simply stop using optional software — no standing for Anthropic
  - Contract disputes should go to Court of Federal Claims, not district court
- Strategy: narrow the case to contract law, away from constitutional claims
- Case styled as *Anthropic PBC v. U.S. Department of War, et al.* — "Department of War" naming is notable
- Filed by DOJ Civil Division: Brett Shumate (AAG), Eric Hamilton (Deputy AAG), James Harlow, Kristina Wolfe, Christian Dibblee

### Research still needed
- **Judge Lin's ruling** (expected imminently — this was the government's last filing before decision)
- Existing congressional proposals on AI in military (if any)
- The neutral amicus brief from Abolitionist Law Center / Access Now / CCR / Tech Justice in detail

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { menuItems } from "../config/menuItems";

function DevelopingReaderManuscriptPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("research");

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowHeader(true), 1000),
      setTimeout(() => setShowSubheader(true), 1500),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative w-full overflow-x-hidden">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        menuItems={menuItems}
      />

      {/* Manuscript Content */}
      <div className="py-16 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 leading-relaxed">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">THE SCIENCE OF THE DEVELOPING READER</h1>
          <h2 className="text-2xl font-light text-white mb-8 text-center">The Developing Reader: An Expert Report on the Science of Reading, Learning, and Vision in Children Aged 5-15</h2>
          <p className="text-center mb-12">John Li</p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-orange-200 mb-4">Abstract</h3>
              <p>The act of reading is a complex orchestration of oculomotor mechanics and high-level cognitive processes. This paper synthesizes research from cognitive science, education, and optometry to present a holistic model of the developing reader. It begins by deconstructing the architecture of reading, explaining the mechanics of saccades, fixations, and the role of executive functions, as measured by eye-tracking technology. The review then outlines the developmental trajectory of literacy, grounded in the "Big Five" foundational skills (phonemic awareness, phonics, fluency, vocabulary, comprehension) and the importance of motivation and self-efficacy. Obstacles to literacy, including the neurobiological basis of dyslexia and the profound impact of environmental factors, are examined. Finally, the paper evaluates the role of the visual system, debunking the claims of speed-reading techniques while highlighting the evidence-based efficacy of vision therapy for treating binocular vision anomalies that impede learning. The report concludes with integrated, evidence-based recommendations for educators, clinicians, and parents.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-orange-200 mb-4">Keywords</h3>
              <p>reading science, literacy, oculomotor control, dyslexia, executive function, vision therapy, phonics, reading comprehension</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-orange-200 mb-4">Significance Statement</h3>
              <p>Reading difficulties affect a significant portion of the population, yet the underlying causes are often misunderstood, leading to ineffective interventions. This report bridges the gap between developmental optometry, cognitive science, and education to provide a unified, evidence-based framework for understanding the developing reader. By synthesizing eye-tracking research, studies on dyslexia, and the science of literacy instruction, it presents a holistic model that integrates the visual-motor foundation, the linguistic-cognitive engine, and the psycho-environmental ecosystem. This work is significant because it provides clear, actionable recommendations for educators, clinicians, and parents, emphasizing the need for interdisciplinary collaboration and highlighting the critical role of functional vision in academic success.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-orange-200 mb-4">Research Transparency Statement</h3>
              <p>The author declares no conflicts of interest. This research did not receive any specific grant from funding agencies in the public, commercial, or not-for-profit sectors.</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white my-8">The Developing Reader: An Expert Report on the Science of Reading, Learning, and Vision</h3>
              
              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">Introduction</h4>
              <p>The act of reading is a complex orchestration of precise physical mechanics and high-level cognitive processes. It is not a smooth sweep of the eyes but a series of rapid movements (saccades) and pauses (fixations), during which the brain takes in visual information. The physiological constraints of the eye, where high-acuity vision is limited to the central fovea, necessitate this stop-and-start process. Efficient reading requires precise binocular coordination, and dysfunction in this system is a significant characteristic of reading difficulty. Beyond mechanics, reading is a profoundly attentional task that relies on executive functions (EF) to inhibit distractions, shift attention, and update working memory. A significant positive correlation exists between EF capacity and reading comprehension. This review synthesizes research to present a holistic model of the developing reader, integrating the visual-motor foundation, the linguistic-cognitive engine, and the psycho-environmental ecosystem in which a child learns.</p>

              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">The Developmental Trajectory and Foundational Skills</h4>
              <p>The journey to skilled reading is built upon a foundation of core components, most famously identified by the National Reading Panel as the "Big Five": phonemic awareness, phonics, fluency, vocabulary, and comprehension. These skills are developmental and interdependent, requiring explicit and systematic instruction for mastery. The science of reading provides clear guidance, supporting multicomponent interventions that integrate strategies for before, during, and after reading, especially for struggling readers.</p>
              <p className="mt-4">This process is not merely cognitive; it is also deeply psychological. A child's self-efficacy—their belief in their ability to succeed—is critical. A reciprocal cycle exists between "skill" and "will": as skills improve, motivation grows, leading to more practice, which in turn drives further skill development. Conversely, struggling readers can enter a debilitating "Matthew effect," where failure fosters a negative self-concept and task avoidance, causing them to fall further behind their peers. Therefore, effective instruction must build skills while simultaneously nurturing confidence. A central goal is to cultivate metacognition, the ability to monitor one's own understanding and deploy strategies to repair comprehension when it breaks down.</p>

              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">Obstacles to Literacy: Dyslexia and Environmental Factors</h4>
              <p>Dyslexia is a neurodevelopmental disorder affecting 5-20% of the population, characterized by difficulties with word recognition, decoding, and spelling. Contrary to myth, its core deficit typically stems from the phonological component of language. Eye-tracking research reveals that dyslexic readers exhibit eye movement patterns (more and longer fixations, more regressions) similar to much younger, typically developing readers, suggesting an immaturity in the underlying oculomotor systems. While there is no "cure," Structured Literacy approaches that teach the structure of language explicitly and systematically are the gold standard of intervention.</p>
              <p className="mt-4">The persistent failure associated with a reading disability takes a significant psychological toll, leading to performance anxiety and negative self-evaluation. This can create a devastating cascade where the primary deficit leads to failure, which causes anxiety and avoidance, preventing the child from getting the practice they need. A child's path to literacy is also profoundly shaped by their environment. Family socioeconomic status and parental education are strongly correlated with reading comprehension scores. The cumulative number of environmental risk factors is a powerful predictor of negative literacy outcomes. The school and peer environment also exert significant influence through classroom climate and teacher efficacy.</p>

              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">The Vision-Brain Axis: Training and Efficiency</h4>
              <p>The visual system is an active, integral, and trainable part of how we learn. A significant subset of what appear to be "reading problems" may in fact be undiagnosed and treatable binocular vision anomalies. Vision Therapy (VT) is a form of neurological rehabilitation that leverages neuroplasticity to improve fundamental visual skills and processing efficiency. It is highly effective for conditions like Convergence Insufficiency (CI), where the eyes struggle to work together at near, causing symptoms like eye strain, headaches, and difficulty sustaining attention that are often mistaken for ADHD. By improving the efficiency of the visual system, VT can enhance reading speed and oculomotor control.</p>
              <p className="mt-4">This contrasts sharply with commercial speed-reading programs, which often make biologically impossible claims. The most fundamental finding in reading psychology is an inescapable speed-comprehension trade-off. Techniques that claim to eliminate subvocalization or take in whole paragraphs at a glance are scientifically unsupported and counterproductive. What these programs often teach is skimming, not reading. Genuine, modest increases in reading rate come not from "tricks," but from making the foundational reading processes more efficient through enhanced metacognitive control and fluency-building interventions like Timed Repeated Reading. The pursuit of speed for its own sake is a misguided goal; the focus should be on building efficiency through mastery of foundational skills.</p>

              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">Synthesis and Recommendations</h4>
              <p>Proficient reading results from the successful integration of three interdependent systems: the visual-motor foundation, the linguistic-cognitive engine, and the psycho-environmental ecosystem. A deficit in any one system can impede the others. This holistic understanding provides a foundation for targeted, evidence-based recommendations.</p>
              <p className="mt-4"><strong>For Educators:</strong> Adopt a multicomponent, evidence-based instructional framework that teaches all five pillars of reading. Prioritize building student self-efficacy to foster a positive reading identity. Become a "first-line screener" for vision problems, recognizing that behaviors like inattention and work avoidance can be symptoms of a treatable binocular vision disorder.</p>
              <p className="mt-4"><strong>For Clinicians:</strong> Embrace interdisciplinary collaboration. Psychologists assessing for ADHD or dyslexia should consider a functional vision exam to rule out a vision-based cause for symptoms. Optometrists should inquire about academic performance when a binocular vision anomaly is found. Treatment plans must address both the primary deficit and the secondary psychological consequences, such as anxiety and low self-esteem.</p>
              <p className="mt-4"><strong>For Parents and Caregivers:</strong> Cultivate a rich home literacy environment by reading aloud and making reading an enjoyable family activity. Be a persistent advocate for your child, insisting on comprehensive assessments that include phonological skills, cognitive abilities, and a functional vision exam. Acknowledge and validate the emotional frustration of academic struggle, separating your child's challenges from their self-worth.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-orange-200 mt-8 mb-4">Acknowledgments</h3>
              <p>The author wishes to thank the anonymous reviewers for their insightful feedback, which significantly improved the quality of this manuscript.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-orange-200 mt-8 mb-4">References</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Eye Movements During Reading - Frontiers for Young Minds</li>
                <li>Immaturity of the Oculomotor Saccade and Vergence Interaction in...</li>
                <li>Executive Functioning with the NIH Examiner and Inference Making in Struggling Readers</li>
                <li>Language and Literacy Development in the Early Years... - ERIC</li>
                <li>...you teach reading - ERIC - Department of Education</li>
                <li>Effects of Reading Interventions Implemented for Upper Elementary Struggling Readers: A Look at Recent Research - PMC</li>
                <li>Reading Self-Efficacy Predicts Word Reading But Not Comprehension in Both Girls and Boys - Frontiers</li>
                <li>Reading and Oral Vocabulary Development in Early Adolescence - Taylor & Francis Online</li>
                <li>Exploring the metacognitive reading strategy awareness in promoting students' reading comprehension skills - ResearchGate</li>
                <li>"Barriers to the Diagnosis of Dyslexia in Children" by Maria Cunningham - EliScholar</li>
                <li>What causes dyslexia? Identifying the causes and effective compensatory therapy - PMC</li>
                <li>(PDF) Cognitive Regulation Strategies Used by Children with...</li>
                <li>The Relationship Between Environmental Factors and Reading Comprehension - ERIC</li>
                <li>(PDF) Environmental Risk Factors and Children's Literacy Skills during the Transition to Elementary School - ResearchGate</li>
                <li>ENVIRONMENTAL FACTORS AND LITERACY LEARNING AND INSTRUCTION by Rebecca Michalak A Master's Thesis Capstone Project Submitted</li>
                <li>Closing Reading Achievement Gaps for Middle School Students - ScholarWorks | Walden University Research</li>
                <li>Vision Therapy for CI, Amblyopia, Strabismus, & More | Omaha - Heartland Eye Consultants</li>
                <li>The speed-accuracy tradeoff: history, physiology, methodology, and behavior - PMC</li>
                <li>So Much to Read, So Little Time: How Do We Read, and Can Speed Reading Help? - PubMed</li>
                <li>(PDF) Does speed-reading training work, and if so, why? Effects of...</li>
                <li>Improving reading rates and comprehension through timed... - ERIC</li>
                <li>(PDF) Insight into the impact of vision therapy on academic...</li>
              </ol>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <div className="flex justify-center gap-4">
            <Link href="#">
              <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition-all duration-200 cursor-pointer font-medium">READ REPORT</span>
            </Link>
            <Link href="/ai">
              <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all duration-200 cursor-pointer font-medium">VIEW PROJECT</span>
            </Link>
            <Link href="/research">
              <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 transition-all duration-200 cursor-pointer font-medium">BACK TO RESEARCH</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DevelopingReaderManuscriptPage;
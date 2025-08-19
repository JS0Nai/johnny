import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RelatedArticles from "../components/RelatedArticles";
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
              <p>The act of reading is a complex orchestration of precise physical mechanics and high-level cognitive processes. It is not a smooth sweep of the eyes but a series of rapid movements (saccades) and pauses (fixations), during which the brain takes in visual information<sup>1</sup>. The physiological constraints of the eye, where high-acuity vision is limited to the central fovea, necessitate this stop-and-start process. Efficient reading requires precise binocular coordination, and dysfunction in this system is a significant characteristic of reading difficulty<sup>3</sup>. Beyond mechanics, reading is a profoundly attentional task that relies on executive functions (EF) to inhibit distractions, shift attention, and update working memory. A significant positive correlation exists between EF capacity and reading comprehension<sup>5</sup>. This review synthesizes research to present a holistic model of the developing reader, integrating the visual-motor foundation, the linguistic-cognitive engine, and the psycho-environmental ecosystem in which a child learns.</p>

              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">The Developmental Trajectory and Foundational Skills</h4>
              <p>The journey to skilled reading is built upon a foundation of core components, most famously identified by the National Reading Panel as the "Big Five": phonemic awareness, phonics, fluency, vocabulary, and comprehension<sup>14</sup>. These skills are developmental and interdependent, requiring explicit and systematic instruction for mastery<sup>15</sup>. The science of reading provides clear guidance, supporting multicomponent interventions that integrate strategies for before, during, and after reading, especially for struggling readers<sup>19</sup>.</p>
              <p className="mt-4">This process is not merely cognitive; it is also deeply psychological. A child's self-efficacy—their belief in their ability to succeed—is critical<sup>29</sup>. A reciprocal cycle exists between "skill" and "will": as skills improve, motivation grows, leading to more practice, which in turn drives further skill development. Conversely, struggling readers can enter a debilitating "Matthew effect," where failure fosters a negative self-concept and task avoidance, causing them to fall further behind their peers<sup>26</sup>. Therefore, effective instruction must build skills while simultaneously nurturing confidence. A central goal is to cultivate metacognition, the ability to monitor one's own understanding and deploy strategies to repair comprehension when it breaks down<sup>32</sup>.</p>

              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">Obstacles to Literacy: Dyslexia and Environmental Factors</h4>
              <p>Dyslexia is a neurodevelopmental disorder affecting 5-20% of the population<sup>39</sup>, characterized by difficulties with word recognition, decoding, and spelling. Contrary to myth, its core deficit typically stems from the phonological component of language<sup>40</sup>. Eye-tracking research reveals that dyslexic readers exhibit eye movement patterns (more and longer fixations, more regressions) similar to much younger, typically developing readers, suggesting an immaturity in the underlying oculomotor systems. While there is no "cure," Structured Literacy approaches that teach the structure of language explicitly and systematically are the gold standard of intervention<sup>39</sup>.</p>
              <p className="mt-4">The persistent failure associated with a reading disability takes a significant psychological toll, leading to performance anxiety and negative self-evaluation<sup>43</sup>. This can create a devastating cascade where the primary deficit leads to failure, which causes anxiety and avoidance, preventing the child from getting the practice they need. A child's path to literacy is also profoundly shaped by their environment<sup>23</sup>. Family socioeconomic status and parental education are strongly correlated with reading comprehension scores. The cumulative number of environmental risk factors is a powerful predictor of negative literacy outcomes<sup>46</sup>. The school and peer environment also exert significant influence through classroom climate and teacher efficacy<sup>47,51</sup>.</p>

              <h4 className="text-2xl font-semibold text-orange-200 mt-6 mb-4">The Vision-Brain Axis: Training and Efficiency</h4>
              <p>The visual system is an active, integral, and trainable part of how we learn. A significant subset of what appear to be "reading problems" may in fact be undiagnosed and treatable binocular vision anomalies. Vision Therapy (VT) is a form of neurological rehabilitation that leverages neuroplasticity to improve fundamental visual skills and processing efficiency<sup>62</sup>. It is highly effective for conditions like Convergence Insufficiency (CI), where the eyes struggle to work together at near, causing symptoms like eye strain, headaches, and difficulty sustaining attention that are often mistaken for ADHD<sup>62</sup>. By improving the efficiency of the visual system, VT can enhance reading speed and oculomotor control<sup>65</sup>.</p>
              <p className="mt-4">This contrasts sharply with commercial speed-reading programs, which often make biologically impossible claims. The most fundamental finding in reading psychology is an inescapable speed-comprehension trade-off<sup>55</sup>. Techniques that claim to eliminate subvocalization or take in whole paragraphs at a glance are scientifically unsupported and counterproductive<sup>56,58</sup>. What these programs often teach is skimming, not reading. Genuine, modest increases in reading rate come not from "tricks," but from making the foundational reading processes more efficient through enhanced metacognitive control and fluency-building interventions like Timed Repeated Reading<sup>36</sup>. The pursuit of speed for its own sake is a misguided goal; the focus should be on building efficiency through mastery of foundational skills.</p>

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
              <ol className="list-decimal list-inside space-y-2 break-words">
                <li>Eye Movements During Reading - Frontiers for Young Minds, accessed July 8, 2025, <a href="https://kids.frontiersin.org/articles/10.3389/frym.2023.769381" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://kids.frontiersin.org/articles/10.3389/frym.2023.769381</a></li>
                <li>Immaturity of the Oculomotor Saccade and Vergence Interaction in..., accessed July 8, 2025, <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0033458" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0033458</a></li>
                <li>Executive Functioning with the NIH Examiner and Inference Making in Struggling Readers, accessed July 5, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8113101/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC8113101/</a></li>
                <li>Language and Literacy Development in the Early Years... - ERIC, accessed July 8, 2025, <a href="https://files.eric.ed.gov/fulltext/EJ1034914.pdf" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://files.eric.ed.gov/fulltext/EJ1034914.pdf</a></li>
                <li>...you teach reading - ERIC - Department of Education, accessed July 8, 2025, <a href="https://files.eric.ed.gov/fulltext/EJ814393.pdf" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://files.eric.ed.gov/fulltext/EJ814393.pdf</a></li>
                <li>Effects of Reading Interventions Implemented for Upper Elementary Struggling Readers: A Look at Recent Research - PMC, accessed July 8, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8553009/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC8553009/</a></li>
                <li>Reading Self-Efficacy Predicts Word Reading But Not Comprehension in Both Girls and Boys - Frontiers, accessed July 8, 2025, <a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2016.02056/full" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2016.02056/full</a></li>
                <li>Reading and Oral Vocabulary Development in Early Adolescence - Taylor & Francis Online, accessed July 5, 2025, <a href="https://www.tandfonline.com/doi/full/10.1080/10888438.2019.1689244" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.tandfonline.com/doi/full/10.1080/10888438.2019.1689244</a></li>
                <li>Exploring the metacognitive reading strategy awareness in promoting students' reading comprehension skills - ResearchGate, accessed July 11, 2025, <a href="https://www.researchgate.net/publication/365897327_Exploring_the_metacognitive_reading_strategy_awareness_in_promoting_students'_reading_comprehension_skills" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.researchgate.net/publication/365897327_Exploring_the_metacognitive_reading_strategy_awareness_in_promoting_students'_reading_comprehension_skills</a></li>
                <li>"Barriers to the Diagnosis of Dyslexia in Children" by Maria Cunningham - EliScholar, accessed July 12, 2025, <a href="https://elischolar.library.yale.edu/yurj/vol2/iss1/15/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://elischolar.library.yale.edu/yurj/vol2/iss1/15/</a></li>
                <li>What causes dyslexia? Identifying the causes and effective compensatory therapy - PMC, accessed July 8, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6971836/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC6971836/</a></li>
                <li>(PDF) Cognitive Regulation Strategies Used by Children with..., accessed July 5, 2025, <a href="https://www.researchgate.net/publication/378581744_Cognitive_Regulation_Strategies_Used_by_Children_with_Reading_Disabilities_A_Literature_Review" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.researchgate.net/publication/378581744_Cognitive_Regulation_Strategies_Used_by_Children_with_Reading_Disabilities_A_Literature_Review</a></li>
                <li>The Relationship Between Environmental Factors and Reading Comprehension - ERIC, accessed July 8, 2025, <a href="https://files.eric.ed.gov/fulltext/EJ1351925.pdf" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://files.eric.ed.gov/fulltext/EJ1351925.pdf</a></li>
                <li>(PDF) Environmental Risk Factors and Children's Literacy Skills during the Transition to Elementary School - ResearchGate, accessed July 5, 2025, <a href="https://www.researchgate.net/publication/234759615_Environmental_Risk_Factors_and_Children's_Literacy_Skills_during_the_Transition_to_Elementary_School" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.researchgate.net/publication/234759615_Environmental_Risk_Factors_and_Children's_Literacy_Skills_during_the_Transition_to_Elementary_School</a></li>
                <li>ENVIRONMENTAL FACTORS AND LITERACY LEARNING AND INSTRUCTION by Rebecca Michalak A Master's Thesis Capstone Project Submitted, accessed July 8, 2025, <a href="https://soar.suny.edu/bitstream/handle/20.500.12648/387/ENVIRONMENTAL%20FACTORS%20AND%20LITERACY%20LEARNING%20AND%20INSTRUCTION.pdf" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://soar.suny.edu/bitstream/handle/20.500.12648/387/ENVIRONMENTAL%20FACTORS%20AND%20LITERACY%20LEARNING%20AND%20INSTRUCTION.pdf</a></li>
                <li>Closing Reading Achievement Gaps for Middle School Students - ScholarWorks | Walden University Research, accessed July 5, 2025, <a href="https://scholarworks.waldenu.edu/cgi/viewcontent.cgi?article=1803&context=jera" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://scholarworks.waldenu.edu/cgi/viewcontent.cgi?article=1803&context=jera</a></li>
                <li>Vision Therapy for CI, Amblyopia, Strabismus, & More | Omaha - Heartland Eye Consultants, accessed July 8, 2025, <a href="https://heartland-eye.com/benefits-of-vision-therapy-for-convergence-insufficiency-amblyopia-strabismus-more/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://heartland-eye.com/benefits-of-vision-therapy-for-convergence-insufficiency-amblyopia-strabismus-more/</a></li>
                <li>The speed-accuracy tradeoff: history, physiology, methodology, and behavior - PMC, accessed July 8, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4052662/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC4052662/</a></li>
                <li>So Much to Read, So Little Time: How Do We Read, and Can Speed Reading Help? - PubMed, accessed July 15, 2025, <a href="https://pubmed.ncbi.nlm.nih.gov/26769745/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://pubmed.ncbi.nlm.nih.gov/26769745/</a></li>
                <li>(PDF) Does speed-reading training work, and if so, why? Effects of..., accessed July 8, 2025, <a href="https://www.researchgate.net/publication/367560632_Does_speed-reading_training_work_and_if_so_why_Effects_of_speed-reading_training_on_reading_speed_and_comprehension" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.researchgate.net/publication/367560632_Does_speed-reading_training_work_and_if_so_why_Effects_of_speed-reading_training_on_reading_speed_and_comprehension</a></li>
                <li>Improving reading rates and comprehension through timed... - ERIC, accessed July 8, 2025, <a href="https://files.eric.ed.gov/fulltext/EJ1015754.pdf" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://files.eric.ed.gov/fulltext/EJ1015754.pdf</a></li>
                <li>(PDF) Insight into the impact of vision therapy on academic..., accessed July 11, 2025, <a href="https://www.researchgate.net/publication/387442136_Insight_into_the_impact_of_vision_therapy_on_academic_performance_A_pilot_study" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.researchgate.net/publication/387442136_Insight_into_the_impact_of_vision_therapy_on_academic_performance_A_pilot_study</a></li>
              </ol>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-sm text-purple-300 mb-4">See Also:</div>
          <div className="flex justify-center gap-4">
            <a href="/The Developing Reader - report.pdf" target="_blank" rel="noopener noreferrer">
              <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition-all duration-200 cursor-pointer font-medium">READ DETAILED REPORT</span>
            </a>
            <Link href="/ai">
              <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all duration-200 cursor-pointer font-medium">VIEW PROJECT</span>
            </Link>
            <Link href="/research">
              <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 transition-all duration-200 cursor-pointer font-medium">BACK TO RESEARCH</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <RelatedArticles 
        tags={["Educational Technology", "Cognitive Science", "Vision Science", "Pedagogy"]}
        category="educational-technology"
      />

      <Footer />
    </div>
  );
}

export default DevelopingReaderManuscriptPage;
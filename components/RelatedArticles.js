import React from "react";
import Link from "next/link";

const RelatedArticles = ({ tags = [], category = "", currentId = null, limit = 3 }) => {
  // Sample articles data - this will eventually come from a centralized source
  const articles = [
    {
      id: 1,
      title: "The Digital Dopamine Loop: How Social Media and Games Are Engineering Your Child's Brain",
      category: "neuroscience",
      date: "Coming Soon",
      readTime: "8 min read",
      excerpt: "Deconstructing the specific design techniques used by tech companies to maximize engagement through deliberate manipulations of the brain's reward circuitry.",
      tags: ["Cognitive Science", "Educational Technology", "Neuroscience", "Digital Health"],
      featured: true,
    },
    {
      id: 2,
      title: "The Accelerator and the Brakes: Why Your Teen's Brain Is Built for Risk",
      category: "neuroscience",
      date: "Coming Soon",
      readTime: "10 min read",
      excerpt: "Using the powerful 'accelerator and brakes' metaphor to explain adolescent behavior and why teen risk-taking is a predictable feature of neurodevelopment.",
      tags: ["Cognitive Science", "Pedagogy", "Neuroscience", "Child Development"],
      featured: false,
    },
    {
      id: 3,
      title: "Beyond Willpower: The Neuroscience of Why Junk Food Is So Addictive",
      category: "neuroscience",
      date: "Coming Soon",
      readTime: "12 min read",
      excerpt: "Moving the conversation about unhealthy eating from moral failing to neurobiological reality - how hyper-palatable foods override natural satiety signals.",
      tags: ["Neuroscience", "Public Health", "Cognitive Science", "Nutrition"],
      featured: false,
    },
    {
      id: 4,
      title: "The Cognitive Cost of Constant Clicks: Digital Overstimulation and Attention",
      category: "educational-technology",
      date: "Coming Soon",
      readTime: "15 min read",
      excerpt: "How digital overstimulation impairs attention and impulse control in developing minds.",
      tags: ["Educational Technology", "Cognitive Science", "Digital Health", "Pedagogy"],
      featured: true,
    },
    {
      id: 5,
      title: "Manufacturing Desire: How Advertising Targets the Developing Reward System",
      category: "consumer-psychology",
      date: "Coming Soon",
      readTime: "10 min read",
      excerpt: "Exploring the psychology of consumerism as a source of dopamine dysregulation and how advertising creates emotional bonds to products in young children.",
      tags: ["Consumer Psychology", "Neuroscience", "Marketing Ethics", "Child Development"],
      featured: false,
    },
    {
      id: 6,
      title: "The Science of 'Good Enough': Natural Rewards in a High-Tech World",
      category: "neuroscience",
      date: "Coming Soon",
      readTime: "8 min read",
      excerpt: "Contrasting how the dopamine system responds to natural rewards versus artificial 'supernormal stimuli' and why real life can feel boring.",
      tags: ["Neuroscience", "Digital Health", "Cognitive Science", "Wellness"],
      featured: false,
    }
  ];

  // Filter related articles based on matching tags or category
  const getRelatedArticles = () => {
    return articles
      .filter(article => {
        // Don't include the current article if specified
        if (currentId && article.id === currentId) return false;
        
        // Check for matching tags
        const hasMatchingTag = tags.some(tag => 
          article.tags.some(articleTag => 
            articleTag.toLowerCase() === tag.toLowerCase()
          )
        );
        
        // Check for matching category
        const hasMatchingCategory = category && article.category === category;
        
        return hasMatchingTag || hasMatchingCategory;
      })
      .slice(0, limit);
  };

  const relatedArticles = getRelatedArticles();

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-light text-white mb-8">Related Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles#article-${article.id}`}
              className="group"
            >
              <div className="bg-gray-800/50 rounded-lg p-6 h-full hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-orange-200 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/articles"
            className="inline-block text-sm px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition-all duration-200 font-medium"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
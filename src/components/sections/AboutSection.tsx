// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Code, Lightbulb, Users, Zap } from 'lucide-react';

// export function AboutSection() {
//   const highlights = [
//     {
//       icon: <Code className="h-6 w-6" />,
//       title: "Clean Code",
//       description: "Writing maintainable, scalable code with best practices"
//     },
//     {
//       icon: <Lightbulb className="h-6 w-6" />,
//       title: "Innovation",
//       description: "Always exploring new technologies and creative solutions"
//     },
//     {
//       icon: <Users className="h-6 w-6" />,
//       title: "Collaboration",
//       description: "Strong team player with excellent communication skills"
//     },
//     {
//       icon: <Zap className="h-6 w-6" />,
//       title: "Performance",
//       description: "Optimizing for speed, efficiency, and user experience"
//     }
//   ];

//   const technologies = [
//     "React", "TypeScript", "Node.js", "Python", "PostgreSQL", 
//     "AWS", "Docker", "GraphQL", "Three.js", "Next.js"
//   ];

//   return (
//     <section id="about" className="py-24 relative">
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">
//               About Me
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//               I'm a passionate software engineer with 5+ years of experience building 
//               robust web applications and scalable systems. I love turning complex problems 
//               into simple, beautiful solutions.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
//             <div>
//               <h3 className="text-2xl font-semibold mb-6 text-secondary">My Journey</h3>
//               <div className="space-y-4 text-muted-foreground">
//                 <p>
//                   Started my journey in computer science at Stanford University, where I 
//                   discovered my passion for creating digital experiences that matter.
//                 </p>
//                 <p>
//                   Since then, I've worked with startups and Fortune 500 companies, 
//                   building everything from mobile apps to distributed systems.
//                 </p>
//                 <p>
//                   When I'm not coding, you'll find me exploring new technologies, 
//                   contributing to open source, or hiking in the mountains.
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {highlights.map((highlight, index) => (
//                 <Card key={index} className="glass hover:glow-primary transition-smooth cursor-pointer">
//                   <CardContent className="p-6 text-center">
//                     <div className="text-primary mb-3 flex justify-center">
//                       {highlight.icon}
//                     </div>
//                     <h4 className="font-semibold mb-2">{highlight.title}</h4>
//                     <p className="text-sm text-muted-foreground">{highlight.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           <div className="text-center">
//             <h3 className="text-2xl font-semibold mb-8 text-secondary">Technologies I Love</h3>
//             <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
//               {technologies.map((tech, index) => (
//                 <Badge 
//                   key={index} 
//                   variant="outline" 
//                   className="px-4 py-2 text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth cursor-pointer"
//                 >
//                   {tech}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
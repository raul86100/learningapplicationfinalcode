//import darklogo from "../images/logo-final-final.png"
//import lightlogo from "../images/studio learning.png"
import blochchain from "../imgaes/aboutimages/blockchain.png"
import backend from "../imgaes/aboutimages/edit-code_3344255.png" 
//import frontend from "../images/customer-review_3343982.png"
import ai from "../imgaes/aboutimages/coding_4616734.png"
 
 
 
 const data=[{
    id:1,
    img:ai,
    title:"ARTIFICAL INTELLIGENECE",
    describe:"Artificial intelligence (AI) is the ability of a computer or a robotcontrolled by a computer to do tasks that are usually done by humansbecause they require human intelligence and discernment.",
    question:"What are the Benefits of Learning AI ?",
    answer:[{ans:"Problem Solving: AI enables the development of advanced algorithms that can solve complex problems efficiently, leading to improved decision-making and innovative solutions in various domains."},
    {ans:"Automation: AI can automate repetitive tasks, leading to increased productivity and efficiency. This can free up human resources for more creative and strategic roles.</p>"},
    {ans:"Data Analysis: AI techniques can analyze vast amounts of data quickly, providing valuable insights and patterns that can inform better business decisions and strategies."}]
},
{
    id:2,
    img:blochchain,
    title:"Block Chain",
    describe:"Blockchain is a decentralized, distributed ledger technology that records transactions across many computers in such a way that the registered transactions cannot be altered retroactively. This technology was originally developed for the digital currency Bitcoin, but it has since been applied to various other fields",
    question:"What are the Benefits of Learning Blockchain ?",
    answer:[{ans:"Decentralization: The data in a blockchain is stored across a network of computers, making it decentralized and distributed. This reduces the need for a central authority and provides a higher level of transparency and security."},  
    {ans:"Transparency: Once a transaction is recorded on the blockchain, it is visible to all participants. This transparency helps to create trust and accountability among the parties involved."}, 
    {ans:"Security: Blockchain uses cryptographic techniques to ensure the security of transactions. Each block in the chain is linked to the previous one using cryptographic hashes, making it difficult to alter the data without changing the entire chain"}]
},
{
    id:3,
    img:backend,
    title:"Machine Learning",
    describe:"Machine learning is a subset of artificial intelligence (AI) that focuses on developing algorithms and statistical models that enable computers to learn from and make predictions or decisions based on data, without being explicitly programmed for each specific task",
    question:"What are the Benefits of Learning ML ?",
    answer:[{ans:"Supervised learning: In supervised learning, the algorithm is trained on a labeled dataset, where the input data and the corresponding output are provided. The goal is to learn a mapping function that can make predictions or classify new, unseen data accurately."}, 
    {ans:"Unsupervised learning: Unsupervised learning involves training algorithms on unlabeled data, where the model aims to discover patterns, relationships, or structures within the data. Clustering and dimensionality reduction are common tasks in unsupervised learning."},   
    {ans:"Reinforcement learning: Reinforcement learning involves training an agent to make decisions in an environment to achieve a specific goal. The agent learns through trial and error, receiving rewards or penalties based on its actions, and it aims to maximize the cumulative reward over time."}]}];
export default data;
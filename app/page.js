import Image from "next/image";

export default function Home() {

  const [wallet,setWalletAddress] = useState("");
  const [collection,setCollectionAddress] = useState("")
  
  const fetchNFTs = async ()=>{
    let nfts;
    console.log("fetch nfts...");
    if(!collection.length){
      
    }else{
      
    }
  } 


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <input onChange={(e)=>{setWalletAddress(e.target.value)}} type="text" placeholder="add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} type={"text"} placeholder="add the collection address"></input>
        <label>
          <input type="checkbox"></input>
        </label>
        <button onClick={
          ()=>{
            fetchNFTs()
          }
        }>{`let's go`}</button>
      </div>
    </div>
  );
}

export default async (id: string) => {
  if (!id || id.trim() === "") {
    console.log("no id")
    
    return process.exit(1);
  };


};
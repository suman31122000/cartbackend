
const checked=(req, res, next) => {
    if(!req.user._id){
    return res.status(401).json({message:"user not found"});
    }
    return res.status(200).json({message:"user found"});
}
export default checked;
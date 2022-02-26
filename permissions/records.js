

const canViewRecords = (userTb) => {
  //admin = 1, only the admin is allowed to view all records
    return userTb.role_id === 1;
}
 permit = (...permittedRoles)=> {
    // return a middleware
    return (req, res, next) => {
      const { user } = req;
      // const user = req.user
  
      if (user && permittedRoles.includes(user.role)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        res.status(403).json({message: "Forbidden"}); // user is forbidden
      }
    }
  }
module.exports = {
    canViewRecords, 
    permit
}
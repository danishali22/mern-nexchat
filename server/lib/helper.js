export const getOtherMember = (members, userId) => 
    members.find((member) => member._id.toString() !== userId.toString());

export const getSockets = (users=[]) => 
    users.map((user)=> userSocketIds.get(user._id.toString()));
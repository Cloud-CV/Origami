export default function (state={},action){
	switch(action.type){
		case "User selected" :
			return action.payload;
	}

	return state;

}
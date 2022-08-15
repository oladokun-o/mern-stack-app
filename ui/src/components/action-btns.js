import React from 'react';

export const AddButton = ({action, state}) => {
	return (	
			<button className="add-btn btn" disabled={state} onClick={action}>
				<i className="bi bi-plus-circle pe-2"></i>Add new data
			</button>     
		)
}

export const SendButton = ({action, state, status}) => {
	return (
			<button className="sendMail btn" disabled={state} onClick={action} id='SendMail'>
				<i className={status ? "spinner-border me-1" : "bi bi-send"}></i> Send
			</button>
		)
}

export const DeleteButton = ({action, state, status}) => {
	return (  	
			<button className="deleteALl btn" disabled={state} onClick={action} id="DeleteAll">
				<i className={status ? "spinner-border me-1" :"bi bi-trash"}></i> Delete
			</button> 
		)
}
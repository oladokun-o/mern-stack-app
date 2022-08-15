import React, { useState, useEffect } from 'react';
import EditTaskModal from './edit-user';
import { sendData } from '../services/UserService';
import { SendButton, DeleteButton } from './action-btns';
import CreateUser from './create-user';

export const Table = ({users, sortTable, userCreated, deleteUserData, userDataEdited}) => {
    const [state, setState] = useState({
      List: users,
      MasterChecked: false,
      SelectedList: [],
			btn: true,
			sending: false,
			deleting: false
    })

		useEffect(() => {
			setState({
				List: users,
				MasterChecked: false,
				SelectedList: [],
				btn: true,
				sending: false,
				deleting: false
			})
		}, [users]);

    const OnMasterChecked = (event) => {
      let tempList = state.List;
      tempList.map((user) => (user.selected = event.target.checked))
			var totalUsers = state.List.length, totalUsersChecked = tempList.filter((e) => e.selected).length

      setState({
        MasterChecked: event.target.checked,
        List: tempList,
        SelectedList: state.List.filter((e) => e.selected),
				btn: totalUsers !== totalUsersChecked
      })
    }

    const OnRowChecked = (e) => {
      let tempList = state.List;
      
      tempList.map((user) => {
        if (user._id === e.target.id) {
          user.selected = e.target.checked
        }
        return user;
      })

      var totalUsers = state.List.length, totalUsersChecked = tempList.filter((e) => e.selected).length;
      
      setState({
        MasterChecked: totalUsers === totalUsersChecked,
        List: tempList,
        SelectedList: state.List.filter((e) => e.selected),
				btn: state.List.filter((e) => e.selected).length === 0
      })

    }

		const GetSelectedRows = (e) => {
			let tempList = state.List;

			setState({ 
				MasterChecked: state.MasterChecked,
				List: tempList,
				SelectedList: state.List.filter((e) => e.selected),
				btn: true,
				sending: true
			})

			sendData(state.SelectedList).then((res) => {
				if (res.status === 200) {
					alert(JSON.stringify(res))
					setState({ 
						MasterChecked: state.MasterChecked,
						List: tempList,
						SelectedList: state.List.filter((e) => e.selected),
						btn: false,
						sending: false
					})
					
				} else {
					alert('Data sent!')
					tempList.map((user) => (user.selected = false))
					setState({ 
						MasterChecked: false,
						List: tempList,
						SelectedList: [],
						btn: true,
						sending: false
					})
				}
			}).catch((res) => {
				//console.log(res)
				alert(JSON.stringify(res))
				setState({ 
					MasterChecked: state.MasterChecked,
					List: tempList,
					SelectedList: state.List.filter((e) => e.selected),
					btn: true,
					sending: false
				})
			})
		}

		const DeleteSelected = (e) => {
			let tempList = state.List;

			setState({ 
				MasterChecked: state.MasterChecked,
				List: tempList,
				SelectedList: state.List.filter((e) => e.selected),
				btn: true,
				deleting: true
			})

			state.SelectedList.forEach(user => {
				deleteUserData(user._id);
			});

		}

    if (users.length === 0) return (
      <div className="container-fluid px-0 mt-5 pt-3">
				<div className="action-btns-box action-btns">
					<SendButton action={GetSelectedRows} state={state.btn} status={state.sending}></SendButton> 
					<DeleteButton action={DeleteSelected} state={state.btn} status={state.deleting}></DeleteButton>	
					<CreateUser userCreated={userCreated} state={state.sending || state.deleting}></CreateUser>			 
				</div> 
        <div className='mt-5 container-fluid text-center'>
          No Records
        </div>
      </div>
    )

    return (
			<>
				<div className="container-fluid position-relative border">
          <div className="action-btns-box action-btns">
            <SendButton action={GetSelectedRows} state={state.btn} status={state.sending}></SendButton> 
            <DeleteButton action={DeleteSelected} state={state.btn} status={state.deleting}></DeleteButton>	
            <CreateUser userCreated={userCreated} state={state.sending || state.deleting}></CreateUser>			 
          </div>   
        </div>    
        <div className="container-fluid">   							
            <div className="container-fluid px-0 mt-5 pt-3">
              <table className="table table-dark table-hover mt-5">
                <thead className='bg-dark table-header'>
                  <tr>
                    <th scope="col">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={state.MasterChecked}
                        id="mastercheck"
                        onChange={OnMasterChecked}
												disabled={state.sending || state.deleting}
                      />
                    </th>
                    <th scope='col' className='header__item'><a onClick={sortTable} className='filter__link filter__link--number' id='id' href="#!">ID</a></th>
                    <th scope="col" className='header__item'><a onClick={sortTable} className='filter__link' id='name' href="#!">Name</a></th>
                    <th scope="col" className='header__item'><a onClick={sortTable} className='filter__link filter__link--number' id='phone_number' href="#!">Phone Number</a></th>
                    <th scope="col" className='header__item'><a onClick={sortTable} className='filter__link' id='email' href="#!">Email</a></th>
                    <th scope="col" className='header__item'><a onClick={sortTable} className='filter__link' id='hobbies' href="#!">Hobbies</a></th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody className='table-content'>
                  {state.List.map((user) => (
                    <tr key={user._id} id={user._id} className={user.selected ? "selected table-row" : "table-row"}>
                      <th scope="row" className="masterbox-th">
                        <input
                          type="checkbox"
                          checked={user.selected}
                          className="form-check-input"
                          id={user._id}
                          onChange={OnRowChecked}
													disabled={state.sending || state.deleting}
                        />
                      </th>
                      <td className='table-data'>{user.serial_no}</td>
                      <td className='table-data text-capitalize'>{user.name}</td>
                      <td className='table-data'>{user.phone_number}</td>
                      <td className='table-data'>{user.email}</td>
                      <td className='table-data'>{user.hobbies}</td>
                      <td className='pe-4'>
                        <div className={state.sending || state.deleting ? "cell-btns Disabled" : "cell-btns"}>
                                <div className="row">
                                    <div className="col-6 p-0">
                                        <EditTaskModal user={user} userEdited={userDataEdited}/>
                                    </div>
                                    <div className="col-6 p-0">
                                        <button type="button" onClick={(e) => deleteUserData(user._id)} className="btn cell-btn deleteOne">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
															</div>
													</div>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>              
            </div>
          <footer className='fixed-bottom bg-dark'>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4 fw-lighter">
                            <span className="pe-4">Items: {users.length}</span>  
                            <span className="checks">Selected: {state.SelectedList.length}</span>                        
                        </div>
                        <div className="col-8 d-flex fw-lighter justify-content-end ps-3">
                        												
                        </div>
                    </div>
                </div>
            </footer>
        </div>
			</>
      );
}
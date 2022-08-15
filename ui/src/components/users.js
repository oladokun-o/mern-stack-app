import React from 'react'
import EditTaskModal from './edit-user';
import $ from 'jquery';

export const Users = ({users, deleteUserData, userDataEdited}) => {    
    //console.log('users length:::', users)
    //if (users.length === 0) return null

    const TaskRow = (user,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                <td><input type="checkbox" name="item[]" className='check' value={user._id} /></td>
                <td>{user._id}</td>
                <td className='text-capitalize'>{user.name}</td>                
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td>{user.hobbies}</td>
                <td>
                    <div className="cell-btns">
                            <div className="row">
                                <div className="col-6 p-0">
                                    <EditTaskModal user={user} userDataEdited={userDataEdited}/>
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
          )
    }

    const taskTable = users.map((user,index) => TaskRow(user,index))

    return(
        <div className="container-fluid">                        
            <div className="d-flex col-12 justify-content-end px-0">
                <div className="pt-2 pb-3 action-btns px-0">
                    <button className='btn sendMail'id='SendMail' disabled>
                        <i className="bi bi-send"></i> Send
                    </button>
                    <button className='btn deleteAll' id='DeleteAll' disabled>
                        <i className="bi bi-trash"></i> Delete
                    </button>
                </div>
            </div>
            <table className="table table-dark table-hover mt-1" disabled>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" id='checkAll' name="checkAll"/>
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Hobbies</th>
                </tr>
                </thead>
                <tbody>
                    {taskTable}
                </tbody>
            </table>
            <footer className='fixed-bottom'>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4 fw-lighter">
                            <span className="checks">Selected: 0</span>                        
                        </div>
                        <div className="col-8 d-flex justify-content-end">
                            
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export const UsersList = [
  {
    id: 1,
    selected: false,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    selected: false,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
  {
    id: 3,
    selected: false,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
  },
  {
    id: 4,
    selected: true,
    name: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
  },
  {
    id: 5,
    selected: false,
    name: "Chelsey Dietrich",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
  },
];

class SelectTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: UsersList,
      MasterChecked: false,
      SelectedList: [],
    };
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {        
        user.selected = e.target.checked;
        console.log(user.selected)
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    />
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th>
                </tr>
              </thead>
              <tbody>
                {this.state.List.map((user) => (
                  <tr key={user.id} className={user.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={user.selected}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                        onChange={(e) => this.onItemCheck(e, user)}
                      />
                    </th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              Get Selected Items {this.state.SelectedList.length} 
            </button>
            <div className="row">
              <b>All Row Items:</b>
              <code>{JSON.stringify(this.state.List)}</code>
            </div>
            <div className="row">
              <b>Selected Row Items(Click Button To Get):</b>
              <code>{JSON.stringify(this.state.SelectedList)}</code>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTableComponent;

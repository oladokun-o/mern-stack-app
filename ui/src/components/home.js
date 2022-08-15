import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table } from './table';
import { getAllUsers, deleteUser } from '../services/UserService';
import $ from 'jquery';

function Home() {
  const [users, setUsers] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState([])
  const [isUserEdited, setUserEdited] = useState(false)


  useEffect(() => {
    getAllUsers().then(users => {
        //console.log(users)
        setUsers(users)
      });
  }, [numberOfUsers, isUserEdited])

  function delUser(userId) {
    deleteUser(userId).then(response => {
      setNumberOfUsers(numberOfUsers - 1)
    });
  }

  function userCreated() {
    setNumberOfUsers(numberOfUsers + 1)
  }

  function userEdited(res) {
    setUserEdited(res)
  }

  function sortTable(e) {
    var orderClass = '';
    e.preventDefault();
    $('.filter__link.filter__link--active').not(e.target).removeClass('filter__link--active');
    $(e.target).toggleClass('filter__link--active');
    $('.filter__link').removeClass('asc desc');

    if(orderClass === 'desc' || orderClass === '') {
            $(e.target).addClass('asc');
            orderClass = 'asc';
    } else {
        $(e.target).addClass('desc');
        orderClass = 'desc';
    }

    var parent = $(e.target).closest('.header__item');
        var index = $(".header__item").index(parent);
    var $table = $('.table-content');
    var rows = $table.find('.table-row').get();
    var isSelected = $(e.target).hasClass('filter__link--active');
    var isNumber = $(e.target).hasClass('filter__link--number');
        
    rows.sort(function(a, b){

        var x = $(a).find('.table-data').eq(index).text();
            var y = $(b).find('.table-data').eq(index).text();
            
        if(isNumber === true) {
                    
            if(isSelected) {
                return x - y;
            } else {
                return y - x;
            }

        } else {
        
            if(isSelected) {		
                if(x < y) return -1;
                if(x > y) return 1;
                return 0;
            } else {
                if(x > y) return -1;
                if(x < y) return 1;
                return 0;
            }
        }
        });

    $.each(rows, function(index,row) {
        $table.append(row);
    });

    return false;
  }
    
  return (
    <div className="App">
      <div className="container-fluid">
        <Table users={users} sortTable={sortTable} userCreated={userCreated} deleteUserData={delUser} userDataEdited={userEdited}></Table>
     </div> 
  </div>
  );
}

export default Home;


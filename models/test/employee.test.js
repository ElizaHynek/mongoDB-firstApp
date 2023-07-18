const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

	it('should throw an error if no "firstName" arg', () => {
		const dep = new Employee({}); // create new Employee, but don't set `firstName` attr value
	
		dep.validate(err => {
			expect(err.errors.firstName).to.exist;
		});
	});

	it('should throw an error if "firstName" is not a string', () => {
		const cases = [{}, []];
		for(let firstName of cases) {
			const dep = new Employee({ firstName });
	
			dep.validate(err => {
				expect(err.errors.firstName).to.exist;
			});
		}
	});

	
/*	it('should throw an error if "firstName" is too short', () => {
		const cases = ['Ab', 'c']; // we test various cases, some of them are too short, some of them are too long
		for(let firstName of cases) {
			const dep = new Employee({ firstName });
	
			dep.validate(err => {
				expect(err.errors.firstName).to.exist;
			});
		}
	}); */

	it('should pass, if all is correct', () => {
		const cases = [{
      firstName: 'Thomas',
      lastName: 'Jefferson',
      department: 'Testing'
    },
    {
      firstName: 'Emma',
      lastName: 'Cowell',
      department: 'Testing'
    }]; 
		for(let person of cases) {
			const dep = new Employee({ person });
	
			dep.validate(err => {
				expect(err.errors.person).to.not.exist;
			});
		}
	});


	after(() => {
		mongoose.models = {};
	});
});
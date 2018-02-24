/**
 * Created by Kashif Ahmed on 9/25/2014.
 */
dashboard.factory('Skills',function(){
    var technicalSkills = {
        name:"Technical Skills",
        list:["Ruby","Node","Python","Rails",
            "Java","OSX","Javascript","iOS",
            "CoffeeScript","Android","Objective-C","Drupal",
            "C","Flask","C++","Dart",
            "C#","Meteor","PHP",
            "Spring","Go","Flex","Haxe"]
    };
    var softSkills ={
        name:"Soft Skills",
        list:[
            "Ruby","Node","Python","Rails",
            "Java","OSX","Javascript","iOS",
            "CoffeeScript","Android","Objective-C","Drupal",
            "C","Flask","C++","Dart",
            "C#","Meteor","PHP",
            "Spring","Go","Flex","Haxe"
        ]
    };
    
    var common_skills = function() {
        return [
            {name:"Ruby", type:'hard', strength:3, description:''},
            {name: "Node", type:'hard', strength:3, description:''},
            {name: "Python", type:'hard', strength:3, description:''},
            {name: "Rails", type:'hard', strength:3, description:''},
            {name: "Java", type:'hard', strength:3, description:''},
            {name: "OSX", type:'hard', strength:3, description:''},
            {name: "Javascript", type:'hard', strength:3, description:''},
            {name: "iOS", type:'hard', strength:3, description:''},
            {name: "CoffeeScript", type:'hard', strength:3, description:''},
            {name: "Android", type:'hard', strength:3, description:''},
            {name: "Objective-C", type:'hard', strength:3, description:''},
            {name: "Drupal", type:'hard', strength:3, description:''},
            {name: "C", type:'hard', strength:3, description:''},
            {name: "Flask", type:'hard', strength:3, description:''},
            {name: "C++", type:'hard', strength:3, description:''},
            {name: "Dart", type:'hard', strength:3, description:''},
            {name: "C#", type:'hard', strength:3, description:''},
            {name: "PHP", type:'hard', strength:3, description:''},
            {name: "Spring", type:'hard', strength:3, description:''},
            {name: "GO", type:'hard', strength:3, description:''},
            {name: "Flex", type:'hard', strength:3, description:''} 
        ];  
    };
    
     var common_soft_skills = function() {
        return [
            {name: "Team Player", type:'soft', strength:3, description:''},
            {name: "Communication", type:'soft', strength:3, description:''},
            {name: "Interpersonal Skills", type:'soft', strength:3, description:''},
            {name: "Leadership", type:'soft', strength:3, description:''},
            {name: "Time management", type:'soft', strength:3, description:''},
            {name: "Negotiations", type:'soft', strength:3, description:''}
        ];
    };
    return{
        technicalSkills:technicalSkills,
        softSkills:softSkills,
        common_skills:common_skills,
        common_soft_skills:common_soft_skills
        
    };
})
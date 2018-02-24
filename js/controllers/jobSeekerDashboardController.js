dashboard.controller('jobSeekerDashboardController',
    [
        '$scope',
        'ApiService',
        'UserService',
        'Languages',
        'Hobbies',
        'Skills',
        '$interval',
        '$rootScope',
        '$timeout'
        ,function($scope,ApiService,UserService, Languages, Hobbies, Skills, $interval, $rootScope,$timeout){
        $scope.getRecruiterSideLinks=ApiService.getRecruiterSideLinks();
        $scope.analyticsList=ApiService.getJobAnalytics();
        $scope.getJobSeekerDashboard = ApiService.getJobSeekerDashboard();
        
        /* Gets the user object from the location storage */
        $scope.user = UserService.get();
        
        $scope.recentlyLiked = ApiService.getRecentSearch();
        $scope.activityList = ApiService.getActivity();


        $scope.data = {
            world_languages: Languages.world_languages(),
            common_languages: Languages.common_languages(),
            hobbies: Hobbies.hobbies(),
            common_hobbies: Hobbies.common_hobbies(),
            common_skills: Skills.common_skills(),
            common_soft_skills: Skills.common_soft_skills(),
            technical_skill_name:'',
            technical_skill_description:'',
            soft_skill_name:'',
            soft_skill_description:'',
            technical_skills:[],
            soft_skills: [],
            language_i_speak:'',
            sampleExperience:{
                startdate:(new Date()).getTime(),
                enddate:(new Date()).getTime()
            },
            newExperience:{}

        };
        $scope.data.newExperience = $scope.data.sampleExperience;

        $scope.styling = {
            toggle:true,
            color:"#fdb020"
        };
        $scope.skinColors = [
            {color:"#fdb020"},
            {color:"#1abc9c"},
            {color:"#8e44ad"},
            {color:"#2c3e50"},
            {color:"#3498db"},
            {color:"#bdc3c7"},
            {color:"#e1e100"}

        ];
//        $scope.openSkinSelector = function(){
//            $scope.styling.toggle = !$scope.styling.toggle;
//        };
//        $scope.changeActiveColor = function(index){
//            $scope.styling.color = $scope.skinColors[index].color;
//            var temp = $scope.user.skills;
//            $scope.user.skills = [];
//            $interval(function(){
//                $scope.user.skills = temp;
//            },5);
//            $('.employment-date').hover(function(){
//                $(this).css('background-color',$scope.styling.color);
//            },function(){
//                $(this).css("background-color",'#b1b1b1');
//            });
//        };


        $scope.skillAutoComplete = function() {
            var query = $scope.data.technical_skill_name;
            return UserService.skillAutoComplete(query);
        };

        $scope.softSkillAutoComplete = function() {
            var query = $scope.data.soft_skill_name;
            return UserService.softSkillAutoComplete(query);
        };

        $scope.titleAutoComplete = function() {
            var query = $scope.user.currentjob;
            return UserService.titleAutoComplete(query);
        };
        $scope.sortableOptions = {
            update: function(e, ui) {
                $timeout(function(){
                    $scope.saveSkills();
                },100);
            }

        };
        $scope.skillList = {
            list:[
                {
                    name:"HTML",
                    description:"Used html extensiviely on projects during my employment with Microsoft",
                    descriptionEditable:false
                },
                {
                    name:"CSS3",
                    description:"Expert in Css3",
                    descriptionEditable:false
                },
                {
                    name:"PhoneGap",
                    description:"Used phoneg gap in my two recent apps",
                    descriptionEditable:false
                },
                {
                    name:"PhotoShop",
                    description:"Photoshop is my prime tool",
                    descriptionEditable:false
                },
                {
                    name:"Android",
                    description:"Love creating apps for Android",
                    descriptionEditable:false
                }
            ],
            isCollapsed:true
        };
        $scope.softSkillList = {
            list:[
                {
                    name:"HTML",
                    description:"Used html extensiviely on projects during my employment with Microsoft",
                    softDescriptionEditable:false
                },
                {
                    name:"CSS3",
                    description:"Expert in Css3",
                    softDescriptionEditable:false
                },
                {
                    name:"PhoneGap",
                    description:"Used phoneg gap in my two recent apps",
                    softDescriptionEditable:false
                },
                {
                    name:"PhotoShop",
                    description:"Photoshop is my prime tool",
                    softDescriptionEditable:false
                },
                {
                    name:"Android",
                    description:"Love creating apps for Android",
                    softDescriptionEditable:false
                }
            ],
            isCollapsed:true
        };



        $scope.tempplayer = '';
        $scope.updateNames = function (){
            if($scope.tempplayer === "") return;
            $scope.skillList.list.push({name: $scope.tempplayer});
            $scope.tempplayer = "";
        };
        $scope.checkForNameDelete = function($index){
            if($scope.skillList.list[$index].name === ''){
                $scope.skillList.list.splice($index, 1);
            }
        };

        $scope.getSkillClass = function(skill) {
            if (skill) {
                switch(skill.strength)
                {
                    case 1: return 'sb-blue';
                    case 2: return 'sb-yellow';
                    case 3: return 'sb-orange';
                    case 4: return 'sb-green';
                }
            }
            return 'sb-orange';
        };

        $scope.getSkillLabel = function(skill) {
            if (skill) {
                switch(skill.strength)
                {
                    case 1: return 'Newbie';
                    case 2: return 'Intermediate';
                    case 3: return 'Skillful';
                    case 4: return 'Expert';
                }
            }
            return 'Skillful';
        };

        $scope.editorEnabled = {
            skill:false,
            softSkill:false
        };
        $scope.removeSkill=function(index){
            $scope.skillList.list.splice(index,1);
        };

        $scope.deleteSkill = function(index, array, type) {
            array.splice(index, 1);

            if (type == 'skills') {
                $scope.saveSkills();
            }
            else {
                UserService.save(type);
            }
        };

        $scope.addLanguage = function(skill, arrayList)
        {
            var found = _.findWhere( arrayList, {name:skill});

            if(!found && skill!=="" && skill!==undefined){
                if (skill.code) {
                    //if you are passing a dict, with code.
                    arrayList.unshift(skill);
                }else {
                    //TODO: get the language code from the languages.js.
                    arrayList.unshift({
                        name: skill,
                        strength: 3,
                        type: 'language',
                        code: '--todo--'
                    });
                }

                UserService.save('languages');
            }
        };

        $scope.addHobby = function(skill, arrayList)
        {
            var found = _.findWhere( arrayList, {name:skill});

            if(!found && skill!=="" && skill!==undefined){
                if (skill.name) {
                    //if you are passing a dict, with name and strength.
                    arrayList.unshift(skill);
                }else {
                    arrayList.unshift({
                        name: skill,
                        strength: 3,
                        type: 'hobby'
                    });
                }
                UserService.save('hobbies');
            }
        };

        $scope.addSkill = function(skill,description,arrayList)
        {
            var found = _.findWhere( arrayList, {name:skill});

            if(!found && skill!=="" && skill!==undefined){
                arrayList.unshift({
                    name:skill,
                    description:description,
                    strength:3,
                    type:'hard'
                });
                $scope.saveSkills();
            }else{
//                console.log('ignore to add:', skill);
            }
        };

        $scope.saveSkills = function()
        {
            var skills = _.union( $scope.data.technical_skills, $scope.data.soft_skills);
            $scope.user.skills = skills;
            UserService.save('skills');
        };

        $scope.addSoftSkill = function(skill,description,arrayList){

            var found = _.findWhere( arrayList, {name:skill});

            if(!found && skill!=="" && skill!==undefined){
                arrayList.unshift({
                    name:skill,
                    description:description,
                    strength:3,
                    type:'soft'
                });
                $scope.saveSkills();
            }else{
                //console.log('ignore to add:', skill);
            }
        };

        $scope.setStrength = function(strength, skill){
            skill.strength=strength;

            $scope.saveSkills();
        };

        $scope.save = function(field) {
            console.log('SAVE ME', field);
            UserService.save(field);
        };


        $scope.removeArrayData = function(index,array,field){
            array.splice(index,1);
            UserService.save(field);
        };
        $scope.addExperience = function(experienceObject){
            if(experienceObject.startdate && experienceObject.enddate &&experienceObject.originaltitle){
                experienceObject.startdate = (new Date(experienceObject.startdate)).getTime();
                experienceObject.enddate = (new Date(experienceObject.enddate)).getTime();
                experienceObject.title = "";
                experienceObject.expdays = 0;
                experienceObject.iscurrent = false;
                experienceObject.org = null
                $scope.user.experience.positions.push(experienceObject);
                UserService.save('experience.positions');

            }else{
                console.log("Add Experience Error")
            }
        };
        $scope.saveStartDate = function(index,inputDate,startDate){
            inputDate = new Date(inputDate);
            if(startDate){
                $scope.user.experience.positions[index].startdate = inputDate.getTime();
            }else{
               $scope.user.experience.positions[index].enddate = inputDate.getTime();
            }
            UserService.save('experience.positions');

        };


          function initialize()
        {
            if ($scope.user.skills) {
                for (var i = 0; i < $scope.user.skills.length; ++i) {
                    var skill = $scope.user.skills[i];
                    if (skill && skill.type == 'soft') {
                        $scope.data.soft_skills.push(skill);
                    }else {
                        $scope.data.technical_skills.push(skill);
                    }
                }
            }

            if (!($scope.user.languages && $scope.user.languages.length)) {
                $scope.user.languages = [];
                $scope.addLanguage(Languages.one()[0], $scope.user.languages);
            }

            if (!($scope.user.hobbies && $scope.user.hobbies.length)) {
                  $scope.user.hobbies = [];
                  var oneHobby =  {name:Hobbies.common_hobbies()[0], strength:3};
                  $scope.addHobby(oneHobby, $scope.user.hobbies);
            }

        }

        initialize();


    }]);


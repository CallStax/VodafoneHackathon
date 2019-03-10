(function(){
    'use strict';

    angular.module('Home').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$window', '$rootScope', '$location'];

    function HomeController($scope, $window, $rootScope, $location){
        $scope.Home = '';
		
        $scope.TextData = 
            {
                lead_top: {
                    en: 'The Għajnu.na platform is an online ecosystem where voluntary NGOs working in the social justice space help connect beneficiaries with benefactors.',
                    mt: 'Il-pjattaforma ta" Għajnu.na hija ekosistema online fejn NGOs volontarji li jaħdmu fl-ispazju tal-ġustizzja soċjali jgħinu biex jgħaqqdu lill-benefiċjarji mal-benefatturi.'
                },
                buttons_emphasis: {
                    en: 'In need of help?',
                    mt: 'Għandek bżonn l-għajnuna?'
                },
                button_big: {
                    en: 'Click here',
                    mt: 'Għafas hawn'
                },
                buttons_p1: {
                    en: 'Your request will go to one of our NGOs who will reach out to you to assess your case and determine how best to help you.',
                    mt: 'It-talba tiegħek se tingħata lil NGOs tagħna li ser jevalwaw l - każ tiegħek u jiddeterminaw kif l-aħjar jgħinnuk.'
                },
                buttons_p2_beforeB: {
                    en: 'We appreciate that asking for help is not easy, which is why your ',
                    mt: 'Napprezzaw li t-talba għall-għajnuna mhix faċli, u għalhekk'
                },
                buttons_p2_inB: {
                    en: 'privacy is of utmost importance to us',
                    mt: 'l-privatezza tiegħek hija ta’ importanza kbira għalina'
                },
                buttons_p2_afterB: {
                    en: 'and we go to great lengths to safeguard it.',
                    mt: 'u għalhekk nagħmlu min kollox biex nħarsuha.'
                },
                buttons_p3inB: {
                    en: 'At no point will you be asked to divulge any personal or sensitive information through the Application',
                    mt: 'Qatt mhu se tintalab informazzjoni personali jew sensittiva permezz ta\' din l-Applikazzjoni'
                },
                buttons_p3AfterB: {
                    en: '(all we need is your public key). If in doubt, reach out to your nearest NGO center where you can',
                    mt: '(kull ma għandna bżonn hija l-"public key"). Jekk għandek xi dubju, mur fl-eqreb ċentru tal-NGO tiegħek fejn tista'
                },
                buttons_p3inB2: {
                    en: 'speak to a representative who can guide you through the process.',
                    mt: 'tkellem lil rappreżentant li jista\' jiggwidak.'
                },
                buttons_p3AfterB2: {
                    en: 'We recommend you utilise a separate and unused account to get started.',
                    mt: 'Nirrikkmandawlek tuża kont separat u mhux użat biex tibda l-proċess.'
                },
                links_bottom: {
                    en: 'We are always on the lookout to grow our network of NGOs and Benefactors. If you think you can contribute, please sign up by following the links below.',
                    mt: 'Jekk taħseb li tista\' tikkontribwixxi f\'din is-soċjeta, jekk jogħġbok irreġistra billi ssegwi l - links hawn taħt.'
                }

            };

        $scope.UpdateLocation = function () {
            console.log("Hello");
            $location.path('/Beneficiary/Request');
        }
    }

}());
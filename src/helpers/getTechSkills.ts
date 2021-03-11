const getTechSkills = ( techSkillsArgs: boolean[] ): string => {

    // checking the values of checkboxes selected

    let techSelected: string = '| ';
    let techValues: string[] = ['C++ ', 'Python ', 'Javascript ', 'NodeJS ', 'React ', 'MongoDB '];

    let n = techSkillsArgs.length;
    for( let i =0; i<n; i++ ) {
        if(techSkillsArgs[i]){
            techSelected += techValues[i];
            techSelected += '| ';
        }
    }
    
    return techSelected;
}
export default getTechSkills;
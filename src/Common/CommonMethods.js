const formatElementFromDynamoDB = (element) =>{
    //Guaranteed information
    let info =   {
        id: element.id.N,
        name: element.name.S,
    };
    //Bonus Info
    if(element.level && element.level.N){
        info.level = element.level.N
    }
    if(element.school && element.school.S){
        info.school = element.school.S
    }
    if(element.spell_list && element.spell_list.S){
        info.spell_list = element.spell_list.S
    }
    if( element.attack_save&&element.attack_save.S){
        info.attack_save = element.attack_save.S
    }
    if(element.material_component&&element.material_component.S){
        info.material_component = element.material_component.S
    }
    if(element.ritual&&element.ritual.S){
        info.ritual = element.ritual.S
    }
    if(element.duration&&element.duration.S){
        info.duration = element.duration.S
    }
    if(element.casting_time&&element.casting_time.S){
        info.casting_time = element.casting_time.S
    }
    if(element.range&&element.range.S){
        info.range = element.range.S
    }
    if(element.description&&element.description.S){
        info.description = element.description.S
    }
    if(element.components&&element.components.L){
        info.components = element.components.L.map((x)=>x.S)
    }
    if(element.spell_list&&element.spell_list.L){
        info.spell_list = element.spell_list.L.map((x)=>x.S)
    }
    
  return info;
};

export default formatElementFromDynamoDB;
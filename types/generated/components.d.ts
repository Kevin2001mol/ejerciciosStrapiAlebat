import type { Schema, Struct } from '@strapi/strapi';

export interface DetailsExperience extends Struct.ComponentSchema {
  collectionName: 'components_details_experiences';
  info: {
    description: '';
    displayName: "teacher's details";
    icon: 'crown';
  };
  attributes: {
    Experience: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface DetailsSchedule extends Struct.ComponentSchema {
  collectionName: 'components_details_schedules';
  info: {
    description: '';
    displayName: 'class details';
    icon: 'archive';
  };
  attributes: {
    Schedule: Schema.Attribute.Time;
  };
}

export interface DetailsSite extends Struct.ComponentSchema {
  collectionName: 'components_details_sites';
  info: {
    description: '';
    displayName: 'event details';
    icon: 'house';
  };
  attributes: {
    Site: Schema.Attribute.String;
  };
}

export interface StudyMaterialsMedia extends Struct.ComponentSchema {
  collectionName: 'components_study_materials_media';
  info: {
    displayName: 'media';
    icon: 'brush';
  };
  attributes: {
    Audio: Schema.Attribute.Media<'audios', true>;
    Image: Schema.Attribute.Media<'images', true>;
    Video: Schema.Attribute.Media<'videos', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'details.experience': DetailsExperience;
      'details.schedule': DetailsSchedule;
      'details.site': DetailsSite;
      'study-materials.media': StudyMaterialsMedia;
    }
  }
}

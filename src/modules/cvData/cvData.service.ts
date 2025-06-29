import { createInternalError } from '../../shared/utils/error.factory.utils';
import cvDataModel from './cvData.model';

export default class CvData {
  static async saveCvData(data: any) {
    if (!data) throw createInternalError('Cv Data was not found in saveCvData');

    let cvDataRecord = new cvDataModel(data);
    cvDataRecord = await cvDataRecord.save();

    return cvDataRecord;
  }
}

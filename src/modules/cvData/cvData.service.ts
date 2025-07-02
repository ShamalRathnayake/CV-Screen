import { createInternalError } from '../../shared/utils/error.factory.utils';
import cvDataModel from './cvData.model';
import { ICv } from './cvData.types';

export default class CvData {
  static async saveCvData(data: Partial<ICv>): Promise<ICv> {
    if (!data) throw createInternalError('Cv Data was not found in saveCvData');

    let cvDataRecord = new cvDataModel(data);
    cvDataRecord = await cvDataRecord.save();

    return cvDataRecord;
  }
}

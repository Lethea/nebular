/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  IterableDiffers,
} from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';

import { NB_DOCUMENT } from '../../theme.options';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from './data-source/tree-grid-data-source';
import { NbTreeGridNode } from './data-source/tree-grid.model';

@Component({
  selector: 'nb-tree-grid, table[nbTreeGrid]',
  template: CDK_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTreeGridComponent<T> extends CdkTable<T> {

  // TODO get rid of this
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<T>,
              differs: IterableDiffers,
              changeDetectorRef: ChangeDetectorRef,
              elementRef: ElementRef,
              @Attribute('role') role: string,
              dir: Directionality,
              @Inject(NB_DOCUMENT) document: any,
              platform: Platform | undefined,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
  }

  private _source: NbTreeGridDataSource<T>;

  @Input() set source(data: NbTreeGridNode<T>[]) {
    if (data instanceof NbTreeGridDataSource) {
      this._source = data;
    } else {
      this._source = this.dataSourceBuilder.create(data);
    }
    this.dataSource = this._source;
  }
}
